import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { EntityType, getEntityTypesData } from '../../types/Entity';

const StyledComponent = styled('div')(({ theme }) => ({
  root: {
    border: '0px'
  }
}));

interface Props {
  type: EntityType | 'Admin';
  showIcon: boolean;
}

const entityTypesData = getEntityTypesData({ color: 'white', fontSize: 25 });

const EntityTypeChip: React.FC<Props> = (props) => {
  
  const data = entityTypesData[props.type];
  return (
    <Chip
      style={{
        background: data.color,
        color: 'white'
      }}
      className="styled-root"
      icon={props.showIcon ? data.icon : undefined}
      label={data.label}
      variant="outlined"
    />
  );
};

export default EntityTypeChip;
