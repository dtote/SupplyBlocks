import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Tooltip
} from '@mui/material';
import { Field, FormikProps } from 'formik';
import { Checkbox, Select, TextField } from 'formik-mui';
import React from 'react';
import { EntityType, visibleEntityTypes } from '../../types/Entity';

// Usando clases CSS simples

export interface SignUpFormFields {
  name: string;
  email: string;
  phoneNumber: string;
  type: EntityType | '';
  awareness: boolean;
}

interface Props extends FormikProps<SignUpFormFields> {
  disabled?: boolean;
}

export const SignUpForm: React.FC<Props> = (props) => {
  
  const { submitForm, isSubmitting, isValid } = props;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Field
            disabled={props.disabled}
            component={TextField}
            variant="outlined"
            color="secondary"
            required
            fullWidth
            id="name"
            label="Company Name"
            name="name"
          />
        </Box>
        <Box>
          <Field
            disabled={props.disabled}
            component={TextField}
            variant="outlined"
            color="secondary"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Field
              disabled={props.disabled}
              component={TextField}
              variant="outlined"
              color="secondary"
              required
              fullWidth
              id="phoneNumber"
              label="Phone number"
              name="phoneNumber"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormControl variant="outlined" className="styled-selectField" fullWidth>
            <InputLabel>Company type</InputLabel>
            <Field
              disabled={props.disabled}
              component={Select}
              variant="outlined"
              color="secondary"
              required
              fullWidth
              id="type"
              label="Company type"
              name="type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {visibleEntityTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
          </Box>
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Field
                disabled={props.disabled}
                type="checkbox"
                component={Checkbox}
                color="secondary"
                required
                id="awareness"
                name="awareness"
              />
            }
            label="I'm aware that registering an entity the active Metamask account is associated permanently to that entity."
          />
        </Box>
      </Box>
      <Box sx={{ 
        margin: theme => theme.spacing(3, 0, 2), 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Tooltip title="Send petition" aria-label="send-petition">
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ color: 'white' }}
              onClick={submitForm}
              disabled={isSubmitting || !isValid || props.disabled}
            >
              Send petition
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
