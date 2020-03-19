import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components';
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import Workouts from './Workouts/Workouts'
import Challenges from './Challenges/Challenges'
import Rankings from './Rankings/Rankings';
import Settings from './Settings/Settings';

const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      font-family: 'Inter'!important;
    }
    body {
        overflow: hidden;
    }
    *::-webkit-scrollbar {
        width: 5px;
    }
        
    *::-webkit-scrollbar-thumb {
        background-color: #146D52;
        outline: 1px solid slategrey;
    }
`

const UnAuthenticatedRoute = ({component, ...rest}: any) => {
  const routeComponent = (props: any) => (
      localStorage.getItem('refreshToken')
          ? <Redirect to='/dashboard'/>
          : React.createElement(component, props)
  );
  return <Route {...rest} render={routeComponent}/>;
};

const AuthenticatedRoute = ({render, ...props}: any) => {
  if(localStorage.getItem('refreshToken')) {
      return <Route {...props} render={render}/>
  }
  else {
      return <Route {...props} render={() => <Redirect to='/sign-in'/>}/>
  }
};

function Application() {
  return (
    <>
      <GlobalStyle/>
      <Router>
        <Switch>
          <UnAuthenticatedRoute path="/sign-in" component={SignIn} />
          <UnAuthenticatedRoute path="/sign-up" component={SignUp} />
          <AuthenticatedRoute path="/workouts" render={() => <Workouts/>} />
          <AuthenticatedRoute path="/challenges" render={() => <Challenges/>} />
          <AuthenticatedRoute path="/rankings" render={() => <Rankings/>} />
          <AuthenticatedRoute path="/settings" render={() => <Settings/>} />
          <Route render={() => <Redirect to='/workouts'/>}/>
        </Switch>
      </Router>
    </>
  )
}

export default Application;
