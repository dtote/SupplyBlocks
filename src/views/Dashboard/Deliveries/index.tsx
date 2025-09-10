import { Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import React, { useCallback, useContext, useState } from 'react';
import DeliveryCard from '../../../components/DeliveryCard';
import Title from '../../../components/Title';
import { GlobalContext } from '../../../contexts';
import { defaultAddress, Product } from '../../../types';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  paddingTop: theme.spacing(4),
  maxWidth: 1600,
  margin: '0 auto',
  width: '100%',
  minHeight: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3)
  }
}));

const StyledDeliveriesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  margin: theme.spacing(3, 0),
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(2),
    margin: theme.spacing(2, 0)
  }
}));

const DeliveriesList: React.FC<{
  deliveries: Product[];
}> = ({ deliveries }) => {

  const [current, setCurrent] = useState('');
  const { timestampDeliveryStep } = useContext(GlobalContext);
  const { enqueueSnackbar } = useSnackbar();

  const timestampCallback = useCallback(
    (address: string) => {
      return () => {
        setCurrent(address);
        timestampDeliveryStep(address)
          .then(() => {
            enqueueSnackbar('Timestamped', { variant: 'success' });
          })
          .catch(() => {
            enqueueSnackbar('Error', { variant: 'error' });
          })
          .finally(() => setCurrent(''));
      };
    },
    [enqueueSnackbar, timestampDeliveryStep]
  );

  return (
    <StyledDeliveriesContainer>
      {deliveries
        .filter((delivery) => delivery.purchaserID !== defaultAddress)
        .map((delivery, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              maxWidth: 800
            }}
          >
            <DeliveryCard
              disabled={current !== delivery.id && current !== ''}
              transacting={current === delivery.id}
              onTimestampCallback={timestampCallback(delivery.id)}
              {...delivery}
            />
          </Box>
        ))}
    </StyledDeliveriesContainer>
  );
};

interface Props { }

const DeliveriesView: React.FC<Props> = (props) => {

  const { globalState } = useContext(GlobalContext);

  return (
    <StyledRoot>
      <Title title={'Deliveries'} />
      <DeliveriesList deliveries={globalState.products} />
    </StyledRoot>
  );
};

export default DeliveriesView;
