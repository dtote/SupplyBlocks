import {
  Button,
  Container,
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

const StyledRoot = styled('div')(({ theme }) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  name: {
    fontSize: 34,
    color: theme.palette.secondary.main
  },
  title: {
    margin: theme.spacing(2)
  },
  message: {
    marginBottom: theme.spacing(4),
    color: theme.palette.secondary.main
  },
  cancelButton: {
    maxWidth: 200,
    background: '#ef6666',
    color: 'white',
    '&:hover': {
      background: '#d85d5d'
    }
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
    <Container className="styled-root" component="main" maxWidth="sm">
      <div className="styled-paper">
        <Logo width={260} smallDevicesWidth={260} />
        <Typography
          className="styled-title"
          component="h1"
          variant="h4"
          align="center"
        >
          Send a petition for joining{' '}
          <Typography className="styled-name" display="inline">
            SupplyBlocks
          </Typography>
        </Typography>
        {pending && (
          <Typography className="styled-message" variant="h6" align="center">
            Your petition is being studied
          </Typography>
        )}
        {alreadyRegistered && (
          <Typography className="styled-message" variant="h6" align="center">
            Already registered
          </Typography>
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
          <Button
            className="styled-cancelButton"
            fullWidth
            variant="contained"
            onClick={useCallback(() => {
              history.push(ApplicationRoutes.welcome.path);
            }, [history])}
          >
            Cancel
          </Button>
        </Tooltip>
      </div>
    </Container>
  );
};

export default SignUpView;
