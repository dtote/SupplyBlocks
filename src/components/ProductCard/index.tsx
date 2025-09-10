import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts';
import { defaultAddress, getEntityTypesData } from '../../types';
import { Product } from '../../types/Product';
import ProductStateChip from '../ProductStateChip';

// Usando clases CSS simples para evitar problemas de sintaxis

interface InfoItemProps {
  text: string;
  icon: React.ReactNode;
  textClassName?: string;
}

export const InfoItem: React.FC<InfoItemProps> = (props) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      mb: 1,
      '& .MuiSvgIcon-root': {
        mr: 1
      }
    }}>
      <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
        {props.icon}
      </Box>
      <Typography
        className={props.textClassName}
        noWrap
        sx={{ fontSize: props.textClassName === 'styled-address' ? 10 : 'inherit' }}
      >
        {props.text}
      </Typography>
    </Box>
  );
};

interface CardButtonProps {
  text: string;
  onClickCallback: () => void;
  disabled: boolean;
  transacting: boolean;
}

const CardButton: React.FC<CardButtonProps> = (props) => {
  return (
    <Box sx={{
      margin: theme => theme.spacing(3, 0, 2),
      position: 'relative',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Tooltip title={props.text} aria-label={props.text}>
        <div>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: 'white' }}
            onClick={props.onClickCallback}
            disabled={props.disabled || props.transacting}
          >
            {props.text}
          </Button>
        </div>
      </Tooltip>
      {props.transacting && (
        <CircularProgress
          size={24}
          sx={{
            color: theme => theme.palette.secondary.main,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px'
          }}
        />
      )}
    </Box>
  );
};

interface Props extends Product {
  onPurchaseCallback: () => void;
  onPrepareCallback: () => void;
  disabled: boolean;
  transacting: boolean;
}

const ProductCard: React.FC<Props> = (props) => {
  const theme = useTheme();
  const {
    name,
    id,
    state,
    creatorID,
    creationTimestamp,
    purchaserID,
    onPurchaseCallback,
    onPrepareCallback,
    deliveryTimestamps
  } = props;
  const { globalState } = useContext(GlobalContext);

  const purchased = purchaserID !== defaultAddress;
  const isRetailer = globalState.entity.type === 'Retailer';
  const isFactory = globalState.entity.type === 'Factory';
  const [deliveryTimestamp] = deliveryTimestamps.slice(-1);

  return (
    <Card sx={{
      padding: 2,
      maxWidth: 400,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <CardContent sx={{
        padding: theme => theme.spacing(3),
        '&:last-child': { paddingBottom: theme => theme.spacing(3) },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, gap: 1 }}>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h5"
              sx={{
                wordBreak: 'break-word',
                lineHeight: 1.2,
                mb: 0.5
              }}
            >
              {name}
            </Typography>
          </Box>
          <Box sx={{ flexShrink: 0 }}>
            <ProductStateChip state={state} showIcon />
          </Box>
        </Box>
        <InfoItem
          text={id}
          textClassName="styled-address"
          icon={<FingerprintIcon className="styled-icon" color="primary" />}
        />
        <InfoItem
          text={creatorID}
          textClassName="styled-address"
          icon={
            getEntityTypesData({
              color: theme.palette.primary.main,
              fontSize: 24,
              marginRight: theme.spacing(1)
            }).Factory.icon
          }
        />
        <InfoItem
          text={creationTimestamp.toUTCString()}
          icon={<EventIcon className="styled-icon" color="primary" />}
        />
        {purchased && (
          <InfoItem
            text={purchaserID!}
            textClassName="styled-address"
            icon={
              getEntityTypesData({
                color: theme.palette.primary.main,
                fontSize: 24,
                marginRight: theme.spacing(1)
              }).Retailer.icon
            }
          />
        )}
        {state === 'Delivered' && (
          <InfoItem
            text={deliveryTimestamp.toUTCString()}
            icon={<EventIcon className="styled-icon" color="primary" />}
          />
        )}
      </CardContent>
      {!purchased && isRetailer && (
        <CardActions sx={{ justifyContent: 'center', padding: 0 }}>
          <CardButton
            text="Purchase"
            onClickCallback={onPurchaseCallback}
            transacting={props.transacting}
            disabled={props.disabled}
          />
        </CardActions>
      )}
      {state === 'Created' && purchased && isFactory && (
        <CardActions sx={{ justifyContent: 'center', padding: 0 }}>
          <CardButton
            text="Prepare"
            onClickCallback={onPrepareCallback}
            transacting={props.transacting}
            disabled={props.disabled}
          />
        </CardActions>
      )}
    </Card>
  );
};

export default ProductCard;
