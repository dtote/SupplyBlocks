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
    <StyledComponent>
      <Chip
        sx={{
          background: data.color,
          color: 'white',
          fontSize: '0.75rem',
          height: 'auto',
          minHeight: 24,
          '& .MuiChip-label': {
            px: 1.5,
            py: 0.5,
            fontSize: '0.75rem',
            fontWeight: 500,
            whiteSpace: 'nowrap'
          },
          '& .MuiChip-icon': {
            fontSize: '1rem',
            ml: 0.5
          }
        }}
        className="root"
        icon={props.showIcon ? data.icon : undefined}
        label={data.label}
        variant="outlined"
      />
    </StyledComponent>
  );
};

export default EntityTypeChip;
