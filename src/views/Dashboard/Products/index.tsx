import { Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useCallback, useContext, useState } from 'react';
import ProductCard from '../../../components/ProductCard';
import Title from '../../../components/Title';
import { GlobalContext } from '../../../contexts';
import { Product } from '../../../types/Product';
import { CreateProductForm } from './Form';
import { CreateProductFormValidationSchema } from './ValidationSchema';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  paddingTop: theme.spacing(4),
  maxWidth: 1400,
  margin: '0 auto',
  width: '100%',
  minHeight: '100%'
}));

const StyledGridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: theme.spacing(3),
  margin: theme.spacing(2, 0),
  width: '100%',
  maxWidth: 1200,
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  }
}));

const StyledFormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(6)
}));

const ProductsList: React.FC<{
  products: Product[];
}> = ({ products }) => {

  const { purchaseProduct, prepareProduct } = useContext(GlobalContext);
  const [current, setCurrent] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const purchaseCallback = useCallback(
    (address: string) => {
      return () => {
        setCurrent(address);
        purchaseProduct(address)
          .then(() => {
            enqueueSnackbar('Purchased', { variant: 'success' });
          })
          .catch(() => {
            enqueueSnackbar('Error', { variant: 'error' });
          })
          .finally(() => setCurrent(''));
      };
    },
    [enqueueSnackbar, purchaseProduct]
  );

  const prepareCallback = useCallback(
    (address: string) => {
      return () => {
        setCurrent(address);
        prepareProduct(address)
          .then(() => {
            enqueueSnackbar('Prepared', { variant: 'success' });
          })
          .catch(() => {
            enqueueSnackbar('Error', { variant: 'error' });
          })
          .finally(() => setCurrent(''));
      };
    },
    [enqueueSnackbar, prepareProduct]
  );

  return (
    <StyledGridContainer>
      {products.map((product, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <ProductCard
            disabled={current !== product.id && current !== ''}
            transacting={current === product.id}
            onPurchaseCallback={purchaseCallback(product.id)}
            onPrepareCallback={prepareCallback(product.id)}
            {...product}
          />
        </Box>
      ))}
    </StyledGridContainer>
  );
};

interface Props { }

const ProductsView: React.FC<Props> = (props) => {

  const { globalState, createProduct, updateProducts } = useContext(
    GlobalContext
  );
  const { enqueueSnackbar } = useSnackbar();
  const isFactory = globalState.entity.type === 'Factory';

  const submitCallback = useCallback(
    (values: CreateProductForm, helpers: FormikHelpers<CreateProductForm>) => {
      createProduct({
        name: values.name
      })
        .then((result: any) => {
          enqueueSnackbar('Success', {
            variant: 'success'
          });
          updateProducts();
        })
        .catch((error: any) => {
          enqueueSnackbar('Error creating product', {
            variant: 'error'
          });
        })
        .finally(() => helpers.setSubmitting(false));
    },
    [createProduct, enqueueSnackbar, updateProducts]
  );

  if (!globalState.entity.approved) {
    return <></>;
  }

  return (
    <StyledRoot>
      {isFactory && (
        <>
          <Title title={'Create product'} />
          <StyledFormContainer maxWidth="xs">
            <Formik<CreateProductForm>
              validationSchema={CreateProductFormValidationSchema}
              initialValues={{
                name: ''
              }}
              validateOnMount
              onSubmit={submitCallback}
            >
              {(props) => {
                return <CreateProductForm {...props} />;
              }}
            </Formik>
          </StyledFormContainer>
        </>
      )}
      <Title title={'Products'} />
      <ProductsList products={globalState.products} />
    </StyledRoot>
  );
};

export default ProductsView;
