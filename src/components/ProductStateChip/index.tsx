import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { getProductStatesData, ProductState } from '../../types/Product';

const StyledChip = styled(Chip)({
  border: '0px'
});

interface Props {
  state: ProductState;
  showIcon: boolean;
}

const productStatesData = getProductStatesData({
  color: 'white',
  fontSize: 25
});

const ProductStateChip: React.FC<Props> = (props) => {
  const data = productStatesData[props.state];
  return (
    <StyledChip
      style={{
        background: data.color,
        color: 'white'
      }}
      icon={props.showIcon ? data.icon : undefined}
      label={data.label}
      variant="outlined"
    />
  );
};

export default ProductStateChip;
