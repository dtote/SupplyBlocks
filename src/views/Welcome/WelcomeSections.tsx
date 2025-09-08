import {
  Box,
  Container,
  Grid,
  Typography
} from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import Timeline from '../../components/Timeline';
import { advantages, agents, getTimelineElements, ItemData } from './data';

const AdvantagesSection = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(10, 2),
  backgroundColor: '#fafafa'
}));

const AgentsSection = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.secondary.light,
  padding: theme.spacing(10, 2)
}));

const HowDoesItWorkSection = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(10, 2),
  backgroundColor: 'white'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 0, 6),
  fontWeight: 'bold',
  fontSize: '2.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem'
  }
}));

const ItemContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  padding: theme.spacing(3),
  height: '100%',
  minHeight: 280
}));

const ItemImage = styled('div')(({ theme }) => ({
  width: 126,
  height: 126,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  }
}));

interface ItemProps extends ItemData {
  typographyClassname: string;
}

const Item: React.FC<ItemProps> = (props) => {
  const { label, typographyClassname, src, text } = props;
  return (
    <ItemContainer>
      <ItemImage>
        <img alt={text} src={src} />
      </ItemImage>
      <Typography
        variant="h5"
        align="center"
        sx={{
          mb: 2,
          fontWeight: 'bold',
          color: typographyClassname === 'styled-agentLabel' ? 'white' : 'primary.main',
          fontSize: '1.3rem'
        }}
      >
        {label}
      </Typography>
      {text && (
        <Typography
          align="center"
          variant="body1"
          sx={{
            color: typographyClassname === 'styled-agentLabel' ? 'rgba(255,255,255,0.9)' : 'text.secondary',
            lineHeight: 1.6,
            fontSize: '0.95rem'
          }}
        >
          {text}
        </Typography>
      )}
    </ItemContainer>
  );
};

export const Agents: React.FC = (props) => {
  return (
    <AgentsSection>
      <SectionTitle align="center" variant="h3" sx={{ color: 'white' }}>
        Supply chain agents
      </SectionTitle>
      <Container maxWidth="md">
        <Typography
          align="center"
          variant="h6"
          sx={{
            color: 'white',
            mb: 6,
            opacity: 0.9,
            lineHeight: 1.6
          }}
        >
          SupplyBlocks usage is intended to aid supply chain management for
          different kind of companies:
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Box sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)"
          },
          gap: 4,
          justifyItems: "stretch",
          width: '100%'
        }}>
          {agents.map((agent, index) => (
            <Item key={index} typographyClassname="styled-agentLabel" {...agent} />
          ))}
        </Box>
      </Container>
    </AgentsSection>
  );
};

export const Advantages: React.FC = (props) => {
  return (
    <AdvantagesSection>
      <SectionTitle align="center" variant="h3" sx={{ color: 'primary.main' }}>
        Advantages
      </SectionTitle>
      <Container maxWidth="lg">
        <Box sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)"
          },
          gap: 6,
          justifyItems: "stretch",
          width: '100%'
        }}>
          {advantages.map((advantage, index) => (
            <Item key={index} typographyClassname="styled-advantageLabel" {...advantage} />
          ))}
        </Box>
      </Container>
    </AdvantagesSection>
  );
};

export const HowDoesItWork: React.FC = (props) => {
  return (
    <HowDoesItWorkSection>
      <SectionTitle align="center" variant="h3" sx={{ color: 'secondary.main' }}>
        How does it work?
      </SectionTitle>
      <Container maxWidth="md">
        <Typography
          align="center"
          variant="h6"
          sx={{
            color: 'secondary.main',
            mb: 6,
            lineHeight: 1.6
          }}
        >
          The following timeline briefly illustrates how SupplyBlocks works.
          Every action described is timestamped and added to the blockchain:
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Timeline elements={getTimelineElements()} />
      </Container>
    </HowDoesItWorkSection>
  );
};
