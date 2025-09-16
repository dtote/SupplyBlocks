import {
  AppBar,
  Toolbar,
  Typography
} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

const StyledToolbar = styled('div')(({ theme }) => ({
  toolbar: {
    background: '#352f2f',
    display: 'flex',
    justifyContent: 'center'
  }
}));

interface Props { }

export const WelcomeTopbar: React.FC<Props> = (props) => {

  return (
    <AppBar position="static">
      <StyledToolbar>
        <Toolbar className="toolbar">
          <Typography align="center" variant="h4">
            SupplyBlocks
          </Typography>
        </Toolbar>
      </StyledToolbar>
    </AppBar>
  );
};

export default WelcomeTopbar;
