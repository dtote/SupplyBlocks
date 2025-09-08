import BuildIcon from '@mui/icons-material/Build';
import ErrorIcon from '@mui/icons-material/Error';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StarIcon from '@mui/icons-material/Star';
import StoreIcon from '@mui/icons-material/Store';
import React from 'react';

export type Address = string;

export const defaultAddress: Address =
  '0x0000000000000000000000000000000000000000';

const entityTypes = [
  'None',
  'Admin',
  'Factory',
  'Transport',
  'Warehouse',
  'Retailer'
] as const;

export const visibleEntityTypes = [
  'Factory',
  'Retailer',
  'Warehouse',
  'Transport'
] as const;

export type EntityType = typeof entityTypes[number];

export type VisibleEntityType = typeof visibleEntityTypes[number];

export interface Entity {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  type: EntityType;
  set: boolean;
  approved: boolean;
}

export interface EntityCreationArgs {
  name: string;
  email: string;
  phoneNumber: string;
  type: EntityType;
}

export const EmptyEntity: Entity = {
  id: defaultAddress,
  email: '',
  name: '',
  phoneNumber: '',
  type: 'None',
  set: false,
  approved: false
};

export const entityTypeConversion: { [key in EntityType]: number } = {
  None: 0,
  Admin: 1,
  Factory: 2,
  Transport: 3,
  Warehouse: 4,
  Retailer: 5
};

export const getEntityType = (id: number) => {
  return entityTypes[id];
};

export interface EntityTypeData {
  icon: JSX.Element;
  color: string;
  label: string;
}

export const getEntityTypesData = (
  style: React.CSSProperties
): {
    [key in EntityType | 'Admin']: EntityTypeData;
  } => {
  return {
    Admin: {
      icon: <StarIcon style={style} />,
      color: '#f6ae9aff',
      label: 'Admin'
    },
    Factory: {
      icon: <BuildIcon style={style} />,
      color: '#f5ab25',
      label: 'Factory'
    },
    Retailer: {
      icon: <StoreIcon style={style} />,
      color: '#51c151',
      label: 'Retailer'
    },
    Transport: {
      icon: <LocalShippingIcon style={style} />,
      color: '#ef6666',
      label: 'Transport'
    },
    Warehouse: {
      icon: <HomeWorkIcon style={style} />,
      color: '#6b6be0',
      label: 'Warehouse'
    },
    None: {
      icon: <ErrorIcon style={style} />,
      color: 'black',
      label: 'Error'
    }
  };
};
