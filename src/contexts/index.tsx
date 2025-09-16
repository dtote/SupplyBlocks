import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useReducer } from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import EntityCompiledContract from '../contracts/Entity.json';
import ManagerCompiledContract from '../contracts/Manager.json';
import ProductCompiledContract from '../contracts/Product.json';
import {
  Address,
  defaultAddress,
  EmptyEntity,
  Entity,
  EntityCreationArgs,
  entityTypeConversion
} from '../types';
import { Product, ProductCreationArgs } from '../types/Product';
import { convertEntity, convertProduct, getRoute } from '../utils';

type UpdateAccount = {
  type: 'UPDATE_ACCOUNT';
  account: string;
};

type UpdateEntity = {
  type: 'UPDATE_ENTITY';
  entity: Entity;
};

type UpdateProducts = {
  type: 'UPDATE_PRODUCTS';
  products: Product[];
};

type UpdateEntities = {
  type: 'UPDATE_ENTITIES';
  entities: Entity[];
};

type Action = UpdateAccount | UpdateEntity | UpdateProducts | UpdateEntities;

export type GlobalContextState = {
  web3: Web3;
  account: Address;
  managerContract: Contract;
  entity: Entity;
  entities: Entity[];
  products: Product[];
};

// Configurar Web3 con configuración permanente para Ganache
const getWeb3Provider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    // Verificar si MetaMask está disponible y no tiene el circuit breaker abierto
    try {
      if (window.ethereum.isMetaMask) {
        // Verificar si está en la red correcta
        const networkVersion = window.ethereum.networkVersion;

        if (networkVersion === '1337') {
          return window.ethereum;
        } else if (networkVersion === null || networkVersion === undefined) {
          console.log('MetaMask aún no está completamente inicializado. Esperando...');
          // Retornar el provider de todos modos, la red se verificará más tarde
          return window.ethereum;
        } else {
          console.log('MetaMask no está en la red Ganache (1337). Red actual:', networkVersion);
          // Intentar cambiar a la red correcta
          window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x539' }] // 1337 en hexadecimal
          }).catch(() => {
            console.log('No se pudo cambiar a Ganache automáticamente');
          });
        }
      }
    } catch (error) {
      console.warn('MetaMask circuit breaker error:', error);
    }
  } else if (Web3.givenProvider) {
    return Web3.givenProvider;
  }

  // Fallback a Ganache local con configuración fija
  return new Web3.providers.HttpProvider('http://127.0.0.1:7545');
};

// Función para reiniciar la conexión Web3
const resetWeb3Connection = () => {
  try {
    if (window.ethereum && window.ethereum.request) {
      // Intentar reiniciar la conexión
      return window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  } catch (error) {
    console.warn('Error al reiniciar conexión:', error);
  }
  return Promise.reject(new Error('No se pudo reiniciar la conexión'));
};


const web3Instance = new Web3(getWeb3Provider());

const initialState: GlobalContextState = {
  web3: web3Instance,
  account: '',
  managerContract: {} as Contract,
  entity: EmptyEntity,
  entities: [],
  products: []
};

// Solo inicializar el contrato si la red está disponible
if (ManagerCompiledContract.networks && (ManagerCompiledContract.networks as any)['1337']) {
  initialState.managerContract = new initialState.web3.eth.Contract(
    ManagerCompiledContract.abi as AbiItem[],
    (ManagerCompiledContract.networks as any)['1337'].address
  );
}

const EmptyPromise = new Promise<any>(() => { });

type Context = {
  globalState: GlobalContextState;
  updateAccount: (address: Address) => void;
  updateProducts: () => Promise<any>;
  updateEntities: () => Promise<any>;
  createEntity: (params: EntityCreationArgs) => Promise<any>;
  createProduct: (params: ProductCreationArgs) => Promise<any>;
  approveEntity: (address: Address | string) => Promise<any>;
  purchaseProduct: (address: Address) => Promise<any>;
  prepareProduct: (address: Address) => Promise<any>;
  timestampDeliveryStep: (address: Address) => Promise<any>;
};

const DefaultContext: Context = {
  globalState: initialState,
  updateAccount: () => null,
  updateProducts: () => EmptyPromise,
  updateEntities: () => EmptyPromise,
  createEntity: () => EmptyPromise,
  createProduct: () => EmptyPromise,
  approveEntity: () => EmptyPromise,
  purchaseProduct: () => EmptyPromise,
  prepareProduct: () => EmptyPromise,
  timestampDeliveryStep: () => EmptyPromise
};

const GlobalContext = React.createContext<Context>(DefaultContext);

const { Provider } = GlobalContext;

const Reducer = (
  state: GlobalContextState,
  action: Action
): GlobalContextState => {
  switch (action.type) {
    case 'UPDATE_ACCOUNT':
      return { ...state, account: action.account };
    case 'UPDATE_ENTITY':
      return { ...state, entity: action.entity };
    case 'UPDATE_PRODUCTS':
      return { ...state, products: action.products };
    case 'UPDATE_ENTITIES':
      return { ...state, entities: action.entities };
    default:
      throw Error('Unknown GlobalContext reducer action');
  }
};

// TODO: Fix renderer hooks
const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  const getEntity = useCallback(
    (account: Address) => {
      if (account === defaultAddress || account === '' || !account || !state.managerContract.methods) {
        return;
      }
      return state.managerContract.methods
        .entitiesMapping(account)
        .call({ from: account })
        .then((address: Address) => {
          if (address === defaultAddress) {
            dispatch({
              type: 'UPDATE_ENTITY',
              entity: convertEntity(EmptyEntity)
            });
          }
          const entityContract = new state.web3.eth.Contract(
            EntityCompiledContract.abi as AbiItem[],
            address
          );
          entityContract.methods
            .data()
            .call()
            .then((result: Entity) => {
              dispatch({
                type: 'UPDATE_ENTITY',
                entity: convertEntity(result)
              });
            })
            .catch((error: any) => {
              console.warn('Error al obtener datos de entidad:', error);
              if (error.message && error.message.includes('circuit breaker')) {
                console.log('Detectado error de circuit breaker, intentando reiniciar conexión...');
                resetWeb3Connection();
              }
            });
        })
        .catch((error: any) => {
          console.warn('Error al obtener entidad:', error);
          if (error.message && error.message.includes('circuit breaker')) {
            console.log('Detectado error de circuit breaker, intentando reiniciar conexión...');
            resetWeb3Connection();
          }
        });
    },
    [state.managerContract, state.web3.eth.Contract]
  );

  // =================================get methods======================================
  const getEntities = useCallback(() => {
    return state.managerContract.methods
      .getEntities()
      .call({ from: state.account })
      .catch(() => {
        return EmptyPromise;
      });
  }, [state.account, state.managerContract.methods]);
  const getProducts = useCallback(() => {
    return state.managerContract.methods
      .getProducts()
      .call({ from: state.account })
      .catch(() => {
        return EmptyPromise;
      });
  }, [state.account, state.managerContract.methods]);
  // ==========================================================================

  // =================================update methods======================================
  const updateAccount = useCallback((address: Address) => {
    dispatch({ type: 'UPDATE_ACCOUNT', account: address });
  }, []);

  const updateEntities = useCallback(() => {
    const result: Promise<any> = getEntities();
    return result.then((entities: any[]) => {
      dispatch({
        type: 'UPDATE_ENTITIES',
        entities: entities ? entities.map(convertEntity) : []
      });
    });
  }, [getEntities]);

  const updateProducts = useCallback(() => {
    const result: Promise<any> = getProducts();
    return result.then((products: any[]) => {
      dispatch({
        type: 'UPDATE_PRODUCTS',
        products: products.map(convertProduct)
      });
    });
  }, [getProducts]);

  useEffect(() => {
    updateEntities();
    updateProducts();
    getEntity(state.account);
  }, [state.account, getEntity, updateEntities, updateProducts]);

  // On component mount
  useEffect(() => {
    // Verificar red después de un breve delay para asegurar que MetaMask esté listo
    const checkNetwork = async () => {
      if (window.ethereum) {
        try {
          const networkId = await window.ethereum.request({ method: 'net_version' });
          if (networkId !== '1337') {
            console.log('Verificación de red: MetaMask en red', networkId, ', esperada: 1337');
          }
        } catch (error) {
          console.warn('No se pudo verificar la red:', error);
        }
      }
    };

    setTimeout(checkNetwork, 1000); // Verificar después de 1 segundo

    state.web3.eth.getAccounts((error: any, accounts: any) => {
      if (accounts) updateAccount(accounts[0]);
    });
  }, [state.web3.eth, updateAccount]);

  // ==========================================================================

  // =================================create methods======================================
  const createEntity = useCallback(
    (params: EntityCreationArgs) => {
      return state.managerContract.methods
        .createEntity(
          params.name,
          params.email,
          params.phoneNumber,
          entityTypeConversion[params.type]
        )
        .send({ from: state.account })
        .then(() => {
          updateEntities();
          getEntity(state.account);
        });
    },
    [state, getEntity, updateEntities]
  );
  const createProduct = useCallback(
    (params: ProductCreationArgs) => {
      if (!state.entity.approved) {
        return EmptyPromise;
      }
      return state.managerContract.methods
        .createProduct(params.name)
        .send({ from: state.account });
    },
    [state]
  );
  // ==========================================================================

  // =================================special actions======================================
  const approveEntity = useCallback(
    (entityAddress: Address) => {
      if (!state.entity.approved) {
        return EmptyPromise;
      }
      return state.managerContract.methods
        .approveEntity(entityAddress)
        .send({ from: state.account })
        .then(() => updateEntities());
    },
    [state, updateEntities]
  );
  const purchaseProduct = useCallback(
    async (productAddress: string) => {
      if (!state.entity.approved) {
        return EmptyPromise;
      }
      const entities = state.entities.filter(
        (entity: Entity) =>
          entity.type === 'Warehouse' || entity.type === 'Transport'
      );
      const route = getRoute(entities, enqueueSnackbar);
      if (route.length === 0) {
        return;
      }

      const productArray = state.products.filter(
        (product: Product) => productAddress === product.id
      );

      if (productArray.length > 1) {
        throw new Error('Something is wrong');
      } else if (productArray.length === 0) {
        return EmptyPromise;
      }
      const product = productArray[0];
      route.unshift(product.creatorID);
      route.push(state.entity.id);

      const contractInstance = new state.web3.eth.Contract(
        ProductCompiledContract.abi as AbiItem[],
        productAddress
      );
      return contractInstance.methods
        .purchase(route, (ManagerCompiledContract.networks as any)[1337].address)
        .send({ from: state.account })
        .then(() => {
          updateProducts();
        });
    },
    [state, enqueueSnackbar, updateProducts]
  );

  const prepareProduct = useCallback(
    async (productAddress: string) => {
      if (!state.entity.approved) {
        return EmptyPromise;
      }
      const contractInstance = new state.web3.eth.Contract(
        ProductCompiledContract.abi as AbiItem[],
        productAddress
      );
      return contractInstance.methods
        .prepareDelivery()
        .send({ from: state.account })
        .then(() => {
          updateProducts();
        });
    },
    [state, updateProducts]
  );

  const timestampDeliveryStep = useCallback(
    (productAddress: string) => {
      if (!state.entity.approved) {
        return EmptyPromise;
      }
      const contractInstance = new state.web3.eth.Contract(
        ProductCompiledContract.abi as AbiItem[],
        productAddress
      );
      return contractInstance.methods
        .timestampDeliveryStep()
        .send({ from: state.account })
        .then(() => {
          updateProducts();
        });
    },
    [state, updateProducts]
  );

  // ==========================================================================
  return (
    <Provider
      value={{
        globalState: state,
        updateAccount,
        updateProducts,
        updateEntities,
        createEntity,
        approveEntity,
        createProduct,
        purchaseProduct,
        prepareProduct,
        timestampDeliveryStep
      }}
    >
      {children}
    </Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
