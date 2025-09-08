import {
  Button,
  Container,
  Tooltip
} from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../contexts';
import { ApplicationRoutes } from '../../routes';

const StyledRoot = styled('div')(({ theme }) => ({
  root: {
    margin: theme.spacing(6, 0, 2)
  },
  button: {
    minHeight: theme.spacing(8),
    color: 'white'
  }
}));

interface Props { }

export const JoinButton: React.FC<Props> = (props) => {

  const [text, setText] = useState('Join SupplyBlocks');
  const { globalState } = useContext(GlobalContext);
  let history = useHistory();

  const clickCallback = useCallback(() => {
    history.push(
      globalState.entity.approved
        ? ApplicationRoutes.dashboard.path
        : ApplicationRoutes.signUp.path
    );
  }, [history, globalState.entity]);

  useEffect(() => {
    setText(
      globalState.entity.approved ? 'Enter dashboard' : 'Join SupplyBlocks'
    );
  }, [globalState.entity]);

  return (
    <Container maxWidth="xs" className="styled-root">
      <Tooltip title={text} aria-label={text}>
        <Button
          className="styled-button"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={clickCallback}
        >
          {text}
        </Button>
      </Tooltip>
    </Container>
  );
};

export default JoinButton;
