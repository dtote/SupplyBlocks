import {
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import Logo from '../../components/Logo';
import JoinButton from './WelcomeButton';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.primary.main,
  minHeight: '80vh',
  padding: theme.spacing(8, 2),
  position: 'relative'
}));

interface Props { }

export const WelcomeJumbotron: React.FC<Props> = (props) => {

  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledRoot>
      <Logo width={400} smallDevicesWidth={300} />
      <Typography
        align="center"
        variant={smallDevice ? 'h5' : 'h4'}
        sx={{
          color: 'white',
          my: 4,
          maxWidth: 600,
          lineHeight: 1.4
        }}
      >
        Blockchain applied to supply chain orchestration.
      </Typography>
      <JoinButton />
    </StyledRoot>
  );
};

export default WelcomeJumbotron;
