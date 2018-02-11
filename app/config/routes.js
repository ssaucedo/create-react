import React from 'react';
import { Router, Route } from 'react-router';
import LandPageContainer from '../containers/LandPageContainer';


const routes = function getRoutes(history) {
  return (
    <Router history={history}>
      <Route >
        <Route path="/patterns" component={props => <LandPageContainer {...props} />}/>
      </Route>
    </Router>
  );
};

export default routes;
