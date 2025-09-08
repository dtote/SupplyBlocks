import {
  Button,
  ThemeProvider
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { OptionsObject, SnackbarProvider, useSnackbar } from 'notistack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GlobalContext, GlobalContextProvider } from '../../contexts';
import { useInterval } from '../../hooks/useInterval';
import ErrorView from '../../views/Error';
import { AppBody } from '../AppBody';

const AppContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%'
});

const StyledButton = styled(Button)({
  maxWidth: 200,
  color: 'white'
});

const theme = createTheme({
  palette: {
    primary: { main: '#558bc4ff' },
    secondary: { main: '#00ae9aff' },
    error: { main: '#f44336' }
  }
});

type useStateBooleanSetter = React.Dispatch<React.SetStateAction<boolean>>;

const OnAccountChange = (
  updateAccount: (account: string) => void,
  enqueueSnackbar: (
    message: React.ReactNode,
    options?: OptionsObject | undefined
  ) => string | number,
  metamaskEnabledSetter: useStateBooleanSetter,
  web3: Web3
) => {
  if (!window.ethereum) {
    metamaskEnabledSetter(false);
    enqueueSnackbar('Metamask not installed', { variant: 'error' });
    return;
  }

  window.ethereum.on('accountsChanged', () => {
    web3.eth.getAccounts((error, accounts) => {
      updateAccount(accounts[0]);
      if (accounts.length === 0) {
        metamaskEnabledSetter(false);
        enqueueSnackbar('Metamask disconnected', { variant: 'error' });
      } else {
        enqueueSnackbar('Account change', { variant: 'info' });
      }
    });
  });
};

const CheckMetamask = (
  valueSetter: useStateBooleanSetter,
  errorSetter: useStateBooleanSetter,
  circuitBreakerSetter?: useStateBooleanSetter
) => () => {
  if (!window.ethereum) {
    errorSetter(true);
  } else {
    try {
      valueSetter(window.ethereum.selectedAddress);
      // Verificar si hay error de circuit breaker
      if (circuitBreakerSetter) {
        circuitBreakerSetter(false);
      }
    } catch (error: any) {
      if (error.message && error.message.includes('circuit breaker')) {
        if (circuitBreakerSetter) {
          circuitBreakerSetter(true);
        }
      }
    }
  }
};

const CheckConnection = (
  web3: Web3,
  errorSetter: useStateBooleanSetter
) => () => {
  web3.eth.net.isListening().catch(() => {
    errorSetter(true);
  });
};

const EnableMetamask = (
  metamaskEnabledSetter: useStateBooleanSetter,
  enqueueSnackbar: (
    message: React.ReactNode,
    options?: OptionsObject | undefined
  ) => string | number
) => () => {
  if (!window.ethereum) {
    metamaskEnabledSetter(false);
    enqueueSnackbar('Metamask not installed', { variant: 'error' });
    return;
  }

  window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(() => {
      metamaskEnabledSetter(true);
      enqueueSnackbar('Metamask enabled', { variant: 'success' });
    })
    .catch(() => {
      metamaskEnabledSetter(false);
      enqueueSnackbar('Error enabling Metamask', { variant: 'error' });
    });
};

interface Props { }

// TODO: Clean imports, warnings, unused makeStyles classes and document smart contracts
// TODO: Reorganize types
export const App: React.FC<Props> = (props) => {
  const { globalState, updateAccount } = useContext(GlobalContext);
  const [connectionError, setConnectionError] = useState(false);
  const [web3ProviderError, setWeb3ProviderError] = useState(false);
  const [circuitBreakerError, setCircuitBreakerError] = useState(false);
  const { web3 } = globalState;
  const { enqueueSnackbar } = useSnackbar();
  const [isMetamaskEnabled, setIsMetamaskEnabled] = useState(true);

  // On component mount
  useEffect(() => {
    CheckMetamask(setIsMetamaskEnabled, setWeb3ProviderError, setCircuitBreakerError);
  }, []);

  const checkMetamask = useCallback(
    CheckMetamask(setIsMetamaskEnabled, setWeb3ProviderError, setCircuitBreakerError),
    []
  );

  const checkConnection = useCallback(
    CheckConnection(web3, setConnectionError),
    [web3]
  );
  useInterval(checkConnection, 3000);
  useInterval(checkMetamask, 3000);

  useEffect(() => {
    OnAccountChange(updateAccount, enqueueSnackbar, setIsMetamaskEnabled, web3);
  }, [updateAccount, enqueueSnackbar, web3]);

  // Función para reiniciar la conexión cuando hay error de circuit breaker
  const resetConnection = useCallback(() => {
    if (window.ethereum && window.ethereum.request) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
          setCircuitBreakerError(false);
          enqueueSnackbar('Conexión reiniciada exitosamente', { variant: 'success' });
        })
        .catch((error: any) => {
          console.warn('Error al reiniciar conexión:', error);
          enqueueSnackbar('Error al reiniciar conexión', { variant: 'error' });
        });
    }
  }, [enqueueSnackbar]);

  // Función para reconectar automáticamente con Ganache
  const reconnectToGanache = useCallback(() => {
    enqueueSnackbar('Reconectando con Ganache...', { variant: 'info' });

    // Intentar cambiar a la red de Ganache
    if (window.ethereum && window.ethereum.request) {
      window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x539', // 1337 en hexadecimal
          chainName: 'Ganache',
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
          },
          rpcUrls: ['http://127.0.0.1:7545'],
          blockExplorerUrls: []
        }]
      }).then(() => {
        enqueueSnackbar('Red Ganache añadida exitosamente', { variant: 'success' });
      }).catch((error: any) => {
        console.warn('Error al añadir red Ganache:', error);
        // Si ya existe la red, intentar cambiar a ella
        window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x539' }]
        }).then(() => {
          enqueueSnackbar('Conectado a Ganache', { variant: 'success' });
        }).catch((switchError: any) => {
          console.warn('Error al cambiar a Ganache:', switchError);
          enqueueSnackbar('Error al conectar con Ganache', { variant: 'error' });
        });
      });
    }
  }, [enqueueSnackbar]);

  let appBody: JSX.Element = <AppBody />;

  if (!isMetamaskEnabled) {
    appBody = (
      <ErrorView
        errorName="Metamask"
        errorMessage="In order to use the dapp Metamask should have account authorization"
      >
        <StyledButton
          color="secondary"
          variant="contained"
          onClick={EnableMetamask(setIsMetamaskEnabled, enqueueSnackbar)}
        >
          Enable Metamask
        </StyledButton>
      </ErrorView>
    );
  }

  if (web3ProviderError) {
    appBody = (
      <ErrorView
        errorName="Web3 provider"
        errorMessage="Metamask not found"
      ></ErrorView>
    );
  }

  if (connectionError) {
    appBody = (
      <ErrorView
        errorName="Connection"
        errorMessage="Start Ganache and configure Metamask network"
      >
        <StyledButton
          color="secondary"
          variant="contained"
          onClick={reconnectToGanache}
          style={{ marginRight: '10px' }}
        >
          Reconectar Ganache
        </StyledButton>
        <StyledButton
          color="primary"
          variant="contained"
          onClick={() => window.location.reload()}
        >
          Recargar Página
        </StyledButton>
      </ErrorView>
    );
  }

  if (circuitBreakerError) {
    appBody = (
      <ErrorView
        errorName="MetaMask Circuit Breaker"
        errorMessage="MetaMask ha bloqueado las transacciones por seguridad. Intenta reiniciar la conexión."
      >
        <StyledButton
          color="secondary"
          variant="contained"
          onClick={resetConnection}
        >
          Reiniciar Conexión
        </StyledButton>
      </ErrorView>
    );
  }

  return <AppContainer>{appBody}</AppContainer>;
};

const WrappedApp: React.FC = () => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={3000}
    >
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </SnackbarProvider>
  </ThemeProvider>
);

export default WrappedApp;
