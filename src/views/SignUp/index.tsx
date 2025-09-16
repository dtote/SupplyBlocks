import {
  Box,
  Button,
  Tooltip,
  Typography
} from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../components/Logo';
import { GlobalContext } from '../../contexts';
import { ApplicationRoutes } from '../../routes';
import { EntityType } from '../../types/Entity';
import { SignUpForm, SignUpFormFields } from './Form';
import { SignUpFormValidationSchema } from './ValidationSchema';



const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 34,
  color: theme.palette.secondary.main,
  margin: theme.spacing(2)
}));

const StyledMessage = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.secondary.main
}));

const StyledCancelButton = styled(Button)(({ theme }) => ({
  maxWidth: 200,
  background: '#ef6666',
  color: 'white',
  '&:hover': {
    background: '#d85d5d'
  }
}));


interface Props { }

export const SignUpView: React.FC<Props> = (props) => {

  const { enqueueSnackbar } = useSnackbar();
  const { globalState, createEntity } = useContext(GlobalContext);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [pending, setPending] = useState(false);

  let history = useHistory();

  const submitCallback = useCallback(
    (values: SignUpFormFields, helpers: FormikHelpers<SignUpFormFields>) => {
      createEntity({
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        type: values.type as EntityType
      })
        .then((result: any) => {
          enqueueSnackbar('Success', {
            variant: 'success'
          });
        })
        .catch((error: any) => {
          enqueueSnackbar('Error sending petition', {
            variant: 'error'
          });
        })
        .finally(() => helpers.setSubmitting(false));
    },
    [createEntity, enqueueSnackbar]
  );

  useEffect(() => {
    setAlreadyRegistered(globalState.entity.approved);
    setPending(globalState.entity.set && !globalState.entity.approved);
  }, [globalState.entity]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        margin: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        <Logo width={260} smallDevicesWidth={260} />
        <Typography
          component="h1"
          variant="h4"
          align="center"
        >
          Send a petition for joining{' '}
          <StyledTypography display="inline">
            SupplyBlocks
          </StyledTypography>
        </Typography>
        {pending && (
          <StyledMessage variant="h6" align="center">
            Your petition is being studied
          </StyledMessage>
        )}
        {alreadyRegistered && (
          <StyledMessage variant="h6" align="center">
            Already registered
          </StyledMessage>
        )}
        <Formik<SignUpFormFields>
          validationSchema={SignUpFormValidationSchema}
          initialValues={{
            name: '',
            email: '',
            phoneNumber: '',
            type: '',
            awareness: false
          }}
          validateOnMount
          onSubmit={submitCallback}
        >
          {(props) => {
            return (
              <SignUpForm disabled={pending || alreadyRegistered} {...props} />
            );
          }}
        </Formik>
        <Tooltip title="Cancel" aria-label="cancel">
          <StyledCancelButton
            fullWidth
            variant="contained"
            onClick={useCallback(() => {
              history.push(ApplicationRoutes.welcome.path);
            }, [history])}
          >
            Cancel
          </StyledCancelButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default SignUpView;
