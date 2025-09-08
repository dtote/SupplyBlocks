import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useCallback } from 'react';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(4, 2)
}));

interface Props { }

export const ScrollToTopButton: React.FC<Props> = (props) => {

  return (
    <StyledContainer>
      <Button
        color="secondary"
        variant="contained"
        sx={{
          maxWidth: 240
        }}
        onClick={useCallback(
          () => window.scroll({ top: 0, left: 0, behavior: 'smooth' }),
          []
        )}
      >
        Scroll to top
      </Button>
    </StyledContainer>
  );
};

export default ScrollToTopButton;
