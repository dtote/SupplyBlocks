import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import CompanyCard from '../../../components/CompanyCard';
import Title from '../../../components/Title';
import { GlobalContext } from '../../../contexts';
import { Entity } from '../../../types/Entity';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  paddingTop: theme.spacing(4),
  maxWidth: 1600,
  margin: '0 auto',
  width: '100%',
  minHeight: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3)
  }
}));

const StyledGridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  gap: theme.spacing(3),
  margin: theme.spacing(3, 0, 0),
  width: '100%',
  maxWidth: 1000,
  justifyContent: 'flex-start',
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: theme.spacing(2.5),
    maxWidth: 800
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: theme.spacing(2),
    maxWidth: 700
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
    maxWidth: '100%'
  }
}));

const CompaniesList: React.FC<{
  companies: Entity[];
}> = ({ companies }) => {

  const { approveEntity } = useContext(GlobalContext);
  const [current, setCurrent] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const clickCallback = useCallback(
    (address: string) => {
      return () => {
        setCurrent(address);
        approveEntity(address)
          .then(() => {
            enqueueSnackbar('Approved', { variant: 'success' });
          })
          .catch(() => {
            enqueueSnackbar('Error', { variant: 'error' });
          })
          .finally(() => setCurrent(''));
      };
    },
    [approveEntity, enqueueSnackbar]
  );

  return (
    <StyledGridContainer>
      {companies.map((company, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            height: '280px'
          }}
        >
          <CompanyCard
            disabled={current !== company.id && current !== ''}
            transacting={current === company.id}
            onClickCallback={clickCallback(company.id)}
            {...company}
          />
        </Box>
      ))}
    </StyledGridContainer>
  );
};

const splitCompanies = (entities: Entity[]) => {
  const pending = entities.filter((entity) => !entity.approved);
  const approved = entities.filter((entity) => entity.approved);

  return { pending, approved };
};

interface Props { }

const CompaniesView: React.FC<Props> = (props) => {

  const { globalState } = useContext(GlobalContext);
  const [companies, setCompanies] = useState<Entity[]>([]);
  const [pendingCompanies, setPendingCompanies] = useState<Entity[]>([]);
  const isAdmin = globalState.entity.type === 'Admin';

  useEffect(() => {
    const { pending, approved } = splitCompanies(globalState.entities);
    setCompanies(approved);
    setPendingCompanies(pending);
  }, [globalState.entities]);

  if (!globalState.entity.approved) {
    return <></>;
  }

  return (
    <StyledRoot>
      {isAdmin && pendingCompanies.length > 0 && (
        <>
          <Title title={'Pending'} />
          <CompaniesList companies={pendingCompanies} />
        </>
      )}
      <Title title={'Companies'} />
      <CompaniesList companies={companies} />
    </StyledRoot>
  );
};

export default CompaniesView;
