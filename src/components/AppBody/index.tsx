import { styled } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApplicationRoutes } from '../../routes';

const RootContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%'
});

interface Props { }

export const AppBody: React.FC<Props> = (props) => {
  return (
    <RootContainer>
      <Router>
        <Switch>
          {Object.keys(ApplicationRoutes).map((key, index) => (
            <Route
              path={ApplicationRoutes[key].path}
              key={index}
              exact={ApplicationRoutes[key].exact}
            >
              {ApplicationRoutes[key].view}
            </Route>
          ))}
        </Switch>
      </Router>
    </RootContainer>
  );
};

export default AppBody;
