import {
  Button,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { GlobalContext } from '../../contexts';
import { ApplicationRoutes, DashboardRoutes } from '../../routes';
import { ErrorView } from '../Error';
import DashboardBody from './body';

const DashboardRoot = styled('div')(({ theme }) => ({
  paddingTop: 56,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    paddingTop: 64
  }
}));

const ShiftedContent = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  paddingLeft: 240,
  paddingTop: 56,
  minHeight: '100vh',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    paddingTop: 64
  }
}));

const ContentContainer = styled('div')({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  flex: 1
});

const FlexGrow = styled('div')({
  flex: 1
});

const SignUpButton = styled(Button)({
  maxWidth: 200,
  color: 'white'
});

// TODO: fix small screens width issue
const Dashboard: React.FC = (props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });
  const [openSidebar, setOpenSidebar] = useState(false);
  const { globalState } = useContext(GlobalContext);
  let history = useHistory();
  const clickCallback = useCallback(() => {
    history.push(ApplicationRoutes.signUp.path);
  }, [history]);

  const handleSidebarOpen = useCallback(() => {
    setOpenSidebar(true);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setOpenSidebar(false);
  }, []);

  const shouldOpenSidebar = isDesktop ? true : openSidebar;
  let content: JSX.Element;

  if (globalState.entity.approved) {
    content = (
      <>
        <DashboardBody pages={DashboardRoutes} />
        <FlexGrow />
        <Footer background={'#FFFFFF'} />
      </>
    );
  } else {
    content = (
      <ErrorView
        errorName="Unauthorized"
        errorMessage="Create an account and wait for SupplyBlocks admin approval before using dashboard"
      >
        <Tooltip title="Sign up" aria-label="sign-up">
          <SignUpButton
            fullWidth
            variant="contained"
            onClick={clickCallback}
            color="secondary"
          >
            Sign up
          </SignUpButton>
        </Tooltip>
      </ErrorView>
    );
  }

  const RootComponent = isDesktop ? ShiftedContent : DashboardRoot;

  return (
    <RootComponent>
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <ContentContainer>{content}</ContentContainer>
    </RootComponent>
  );
};

export default Dashboard;
