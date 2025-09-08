import { styled } from '@mui/material/styles';
import React from 'react';
import Footer from '../../components/Footer/Footer';
import { ScrollToTopButton } from '../../components/ScrollToTopButton';
import WelcomeJumbotron from './WelcomeJumbotron';
import { Advantages, Agents, HowDoesItWork } from './WelcomeSections';
import WelcomeTopbar from './WelcomeTopbar';

const WelcomeContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%'
});

interface Props { }

export const WelcomeView: React.FC<Props> = (props) => {
  return (
    <WelcomeContainer>
      <WelcomeTopbar />
      <WelcomeJumbotron />
      <Advantages />
      <Agents />
      <HowDoesItWork />
      <ScrollToTopButton />
      <Footer background={'#FFFFFF'} />
    </WelcomeContainer>
  );
};

export default WelcomeView;
