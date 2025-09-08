import {
  Link,
  Typography,
  useTheme,
  Box
} from '@mui/material';
import React from 'react';

import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  width: '100%',
  textAlign: 'center',
  gap: theme.spacing(1)
}));

interface Props {
  background: string;
}

const Footer: React.FC<Props> = (props) => {
  const { background } = props;
  const theme = useTheme();
  const fontColor = theme.palette.getContrastText(background);

  return (
    <StyledFooter sx={{ backgroundColor: background }}>
      <Typography
        sx={{ color: fontColor }}
        variant="body1"
        align="center"
      >
        &copy;
        <Link
          component="a"
          href="https://github.com/DauteRR/SupplyBlocks"
          target="_blank"
          sx={{
            color: fontColor,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          SupplyBlocks
        </Link>{' '}
        2020
      </Typography>
      <Typography
        sx={{ color: fontColor }}
        variant="caption"
        align="center"
        maxWidth="700px"
      >
        Cybersecurity and Data Intelligence Master's Degree final project,
        created by{' '}
        <Link
          component="a"
          href="https://github.com/DauteRR"
          target="_blank"
          sx={{
            color: fontColor,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Daute Rodríguez Rodríguez
        </Link>
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
