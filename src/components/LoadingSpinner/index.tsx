import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const SpinnerContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)'
});

interface Props { }

export const LoadingSpinner: React.FC<Props> = (props) => {
  return (
    <SpinnerContainer>
      <CircularProgress size={120} />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
