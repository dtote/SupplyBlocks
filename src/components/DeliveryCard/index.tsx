import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import React, { useCallback, useContext, useState } from 'react';
import { GlobalContext } from '../../contexts';
import { Address } from '../../types';
import { Product } from '../../types/Product';
import { getTimelineElements } from '../../utils';
import ProductStateChip from '../ProductStateChip';
import Timeline from '../Timeline';

const StyledCard = styled(Card)({
  width: '100%'
});

const CardHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2)
}));

const DeliveryState = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(2)
}));

const GrowDiv = styled('div')({
  flexGrow: 1
});

const ExpandButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>(({ theme, expanded }) => ({
  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const StyledCardContent = styled(CardContent)({
  padding: 0,
  '&:last-child': {
    padding: 0
  }
});

const ButtonWrapper = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(2),
  position: 'relative'
}));

const StyledButton = styled(Button)({
  color: 'white'
});

const ButtonProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.secondary.main,
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12
}));

const TimelineContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2)
}));

interface TimestampButtonProps {
  onClickCallback: () => void;
  disabled: boolean;
  transacting: boolean;
}

const TimestampButton: React.FC<TimestampButtonProps> = (props) => {
  return (
    <ButtonWrapper>
      <Tooltip title="Timestamp" aria-label={'timestamp'}>
        <div>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={props.onClickCallback}
            disabled={props.disabled || props.transacting}
          >
            Timestamp
          </StyledButton>
        </div>
      </Tooltip>
      {props.transacting && (
        <ButtonProgress size={24} />
      )}
    </ButtonWrapper>
  );
};

const DeliveryTimeline: React.FC<{ delivery: Product }> = ({ delivery }) => {
  const { globalState } = useContext(GlobalContext);
  const theme = useTheme();
  return (
    <Timeline
      elements={getTimelineElements(delivery, globalState.entities, theme)}
    />
  );
};

interface Props extends Product {
  onTimestampCallback: () => void;
  disabled: boolean;
  transacting: boolean;
}

const DeliveryCard: React.FC<Props> = (props) => {
  const {
    id,
    name,
    state,
    deliveryEntities,
    deliveryStep,
    onTimestampCallback
  } = props;
  const { globalState } = useContext(GlobalContext);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const getProduct = useCallback((id: Address) => {
    const filtered = globalState.products.filter(
      (product) => product.id === id
    );
    if (filtered.length !== 1) {
      throw new Error('Something is wrong');
    }
    return filtered[0];
  }, [globalState.products]);

  const nextEntity = deliveryEntities[deliveryStep] === globalState.account;
  const isFactory = globalState.entity.type === 'Factory';

  return (
    <StyledCard>
      <StyledCardContent>
        <CardHeader>
          <DeliveryState>
            <ProductStateChip state={state} showIcon />
          </DeliveryState>
          <Typography variant="h5" noWrap>
            {name}
          </Typography>
          <GrowDiv />
          {nextEntity && !isFactory && (
            <TimestampButton
              onClickCallback={onTimestampCallback}
              disabled={props.disabled}
              transacting={props.transacting}
            />
          )}
          <ExpandButton
            expanded={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandButton>
        </CardHeader>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <TimelineContainer>
            <DeliveryTimeline delivery={getProduct(id)} />
          </TimelineContainer>
        </Collapse>
      </StyledCardContent>
    </StyledCard>
  );
};

export default DeliveryCard;
