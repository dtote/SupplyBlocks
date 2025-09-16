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
      alignItems: 'flex-start',
      mb: 1.5,
      gap: 1,
      '& .MuiSvgIcon-root': {
        flexShrink: 0,
        mt: 0.1
      }
    }}>
      <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
        {props.icon}
      </Box>
      <Typography
        className={props.textClassName}
        sx={{
          fontSize: props.textClassName === 'styled-address' ? '0.75rem' : 'inherit',
          wordBreak: 'break-all',
          lineHeight: 1.3,
          minWidth: 0,
          flex: 1
        }}
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
      width: '100%',
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
        p: 2.5,
        '&:last-child': { pb: 2.5 },
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minHeight: 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3, gap: 1 }}>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h5"
              sx={{
                wordBreak: 'break-word',
                lineHeight: 1.2,
                mb: 0.5,
                ...customColorStyles(getEntityTypesData({})[type].color)
              }}
            >
              {name}
            </Typography>
          </Box>
          <Box sx={{ flexShrink: 0 }}>
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
      <CardActions sx={{
        justifyContent: 'center',
        padding: approved ? theme => theme.spacing(1.5) : 0,
        minHeight: 60,
        display: 'flex',
        alignItems: 'center'
      }}>
        {!approved ? (
          <CardButton
            onClickCallback={onClickCallback}
            transacting={props.transacting}
            disabled={props.disabled}
          />
        ) : null}
      </CardActions>
    </Card>
  );
};

export default CompanyCard;
