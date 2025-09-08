import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Tooltip
} from '@mui/material';
import { Field, FormikProps } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';

// Usando clases CSS simples

export interface CreateProductForm {
  name: string;
}

interface Props extends FormikProps<CreateProductForm> { }

export const CreateProductForm: React.FC<Props> = (props) => {

  const { submitForm, isSubmitting, isValid } = props;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Field
          component={TextField}
          variant="outlined"
          color="secondary"
          required
          fullWidth
          id="name"
          label="Product Name"
          name="name"
        />
      </Box>
      <Box sx={{ 
        margin: theme => theme.spacing(3, 0, 2), 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Tooltip title="Create product" aria-label="create-product">
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ color: 'white' }}
              onClick={submitForm}
              disabled={isSubmitting || !isValid}
            >
              Create product
            </Button>
          </div>
        </Tooltip>
        {isSubmitting && (
          <CircularProgress 
            size={24} 
            sx={{
              color: theme => theme.palette.secondary.main,
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px'
            }}
          />
        )}
      </Box>
    </form>
  );
};
