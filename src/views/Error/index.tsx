import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import React from 'react';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}));

const SadEmoticon = styled(Typography)({
  fontSize: 152
});

const IconContainer = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(1)
}));

const ErrorNameBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1)
}));

const MessageBox = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4)
}));

interface Props {
  errorName: string;
  errorMessage: string;
  children?: React.ReactNode;
}

export const ErrorView: React.FC<Props> = (props) => {
  return (
    <StyledContainer maxWidth="sm">
      <SadEmoticon color="secondary">
        :(
      </SadEmoticon>
      <ErrorNameBox>
        <IconContainer>
          <WarningRoundedIcon
            fontSize="large"
            color="secondary"
          />
        </IconContainer>
        <Typography align="center" variant="h5" color="secondary">
          {props.errorName + ' error'}
        </Typography>
      </ErrorNameBox>
      <MessageBox align="center" variant="h5">
        {props.errorMessage}
      </MessageBox>
      {props.children}
    </StyledContainer>
  );
};

export default ErrorView;
