import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ApplicationRoutes } from '../../routes';
import Logo from '../Logo';

// Usando clases CSS simples para evitar problemas de sintaxis

interface Props {
  onSidebarOpen: () => void;
}

const Topbar: React.FC<Props> = (props) => {

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });
  const { onSidebarOpen } = props;
  let history = useHistory();
  const clickCallback = useCallback(() => {
    history.push(ApplicationRoutes.welcome.path);
  }, [history]);

  return (
    <AppBar className="styled-root">
      <Toolbar>
        <Logo width={100} smallDevicesWidth={60} breakpoint="md" />
        <Typography variant={isLargeScreen ? 'h4' : 'h5'} className="styled-title">
          SupplyBlocks
        </Typography>
        <div className="styled-flexGrow" />
        <Tooltip title="Go back" aria-label="go-back">
          <IconButton
            className="styled-exitButton"
            onClick={clickCallback}
            color="inherit"
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
        {!isLargeScreen && (
          <Tooltip title="Toggle menu" aria-label="toggle-menu">
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
