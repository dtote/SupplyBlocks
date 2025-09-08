import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Tooltip,
  Typography
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PhoneIcon from '@mui/icons-material/Phone';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Entity, getEntityTypesData } from '../../types/Entity';
import { customColorStyles } from '../../utils';
import EntityTypeChip from '../EntityTypeChip';

// Usando clases CSS simples para evitar problemas de sintaxis

interface InfoItemProps {
  text: string;
  icon: React.ReactNode;
  textClassName?: string;
}

const InfoItem: React.FC<InfoItemProps> = (props) => {
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
      <Tooltip title="Accept company" aria-label="accept-company">
        <div>
          <Button
            variant="contained"
            color="secondary"
            sx={{ color: 'white' }}
            onClick={props.onClickCallback}
            disabled={props.disabled || props.transacting}
          >
            Accept
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

interface Props extends Entity {
  onClickCallback: () => void;
  disabled: boolean;
  transacting: boolean;
}

const CompanyCard: React.FC<Props> = (props) => {
  const {
    email,
    name,
    phoneNumber,
    type,
    approved,
    id,
    onClickCallback
  } = props;

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4
      }
    }}>
      <CardContent sx={{ 
        p: 3,
        '&:last-child': { pb: 3 },
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              noWrap
              className={
                customColorStyles(getEntityTypesData({})[type].color)
                  .customColor
              }
            >
              {name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <EntityTypeChip type={type} showIcon />
          </Box>
        </Box>
        <InfoItem
          text={id}
          textClassName="styled-address"
          icon={<FingerprintIcon className="styled-icon" color="primary" />}
        />
        <InfoItem
          text={email}
          icon={<EmailIcon className="styled-icon" color="primary" />}
        />
        <InfoItem
          text={phoneNumber}
          icon={<PhoneIcon className="styled-icon" color="primary" />}
        />
      </CardContent>
      {!approved && (
        <CardActions sx={{ justifyContent: 'center', padding: 0 }}>
          <CardButton
            onClickCallback={onClickCallback}
            transacting={props.transacting}
            disabled={props.disabled}
          />
        </CardActions>
      )}
    </Card>
  );
};

export default CompanyCard;
