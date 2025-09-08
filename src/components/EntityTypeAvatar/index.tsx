import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { EntityType, getEntityTypesData } from '../../types/Entity';

const StyledAvatar = styled(Avatar)({
  width: 60,
  height: 60
});

interface Props {
  type: EntityType | 'Admin';
}

const entityTypesData = getEntityTypesData({ color: 'white', fontSize: 50 });

const EntityTypeAvatar: React.FC<Props> = (props) => {
  const data = entityTypesData[props.type];
  return (
    <StyledAvatar
      style={{ background: data.color }}
      alt="Company logo"
      variant="square"
    >
      {data.icon}
    </StyledAvatar>
  );
};

export default EntityTypeAvatar;
