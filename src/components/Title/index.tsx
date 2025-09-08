import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledTitleContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const Title: React.FC<{ title: string }> = ({ title }) => {
  return (
    <StyledTitleContainer>
      <Typography
        variant="h4"
        color="primary"
        sx={{
          padding: theme => theme.spacing(0, 2)
        }}
      >
        {title}
        <Divider sx={{ backgroundColor: 'primary.main' }} />
      </Typography>
    </StyledTitleContainer>
  );
};

export default Title;
