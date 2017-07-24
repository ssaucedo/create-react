import React from 'react'
import { Router, Route } from 'react-router'
import LandPageContainer from '../containers/LandPageContainer'
import LoginContainer from '../containers/LoginContainer'


export function getRoutes (history) {

  return (
      <div id='main-container'>
        <div className='router'>
          <Router history={history}>
            <Route >
              <Route path='/login' component={(props) => <LoginContainer {...props} />}/>
              <Route path='/home' component={(props) => <LandPageContainer {...props} />}/>
            </Route>
          </Router>
        </div>
      </div>
  )
}
