import {
  Divider,
  Drawer,
  DrawerProps
} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { DashboardRoutes } from '../../routes';
import Profile from '../Profile';
import SidebarNav from '../SidebarNav';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  }
}));

const DrawerContent = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: theme.spacing(2)
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0)
}));

interface Props {
  onClose: () => void;
  variant: DrawerProps['variant'];
  open: boolean;
}

const Sidebar: React.FC<Props> = (props) => {
  const { open, variant, onClose } = props;

  return (
    <StyledDrawer
      anchor="left"
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <DrawerContent>
        <Profile />
        <StyledDivider />
        <SidebarNav pages={DashboardRoutes} />
      </DrawerContent>
    </StyledDrawer>
  );
};

export default Sidebar;
