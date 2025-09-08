import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../contexts';
import EntityTypeAvatar from '../EntityTypeAvatar';
import EntityTypeChip from '../EntityTypeChip';

const StyledProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  minHeight: 'fit-content',
  textAlign: 'center'
}));

const StyledContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(0.5),
  transition: 'background-color 0.2s ease',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));

const Profile: React.FC = (props) => {

  const { globalState } = useContext(GlobalContext);
  const [entity, setEntity] = useState(globalState.entity);

  useEffect(() => {
    setEntity(globalState.entity);
  }, [globalState.entity]);

  if (!globalState.entity.approved) {
    return <></>;
  }

  return (
    <StyledProfileContainer>
      <EntityTypeAvatar type={entity.type} />
      <Typography
        align="center"
        variant="h5"
        sx={{
          mt: 1,
          mb: 1.5,
          color: 'text.primary'
        }}
      >
        {entity.name}
      </Typography>

      <StyledContactItem>
        <EmailIcon
          sx={{
            fontSize: 16,
            color: 'text.secondary'
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem'
          }}
        >
          {entity.email}
        </Typography>
      </StyledContactItem>

      <StyledContactItem>
        <PhoneIcon
          sx={{
            fontSize: 16,
            color: 'text.secondary'
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem'
          }}
        >
          {entity.phoneNumber}
        </Typography>
      </StyledContactItem>

      <Box sx={{ mt: 1.5 }}>
        <EntityTypeChip showIcon={false} type={entity.type} />
      </Box>
    </StyledProfileContainer>
  );
};

export default Profile;
