import React from 'react';
import './App.css';

import {Switch , Route } from 'react-router-dom';

import Header from './components/Header/Header';

import Homepage from './pages/Homepage/Homepage';
import Loginpage from './pages/LoginPage/LoginPage';
import Registerpage from './pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPassword';
import PasswordResetPage from './pages/PasswordResetPage/PasswordReset';
import NotFound from './pages/NotFound/NotFound';
import Gallery from './pages/Gallery/Gallery';
import ConfirmEmail from './pages/ConfirmEmailPage/ConfirmEmail';
import ConfirmPasswordReset from './pages/ConfirmPasswordReset/ConfirmPasswordReset';

import {connect} from 'react-redux';

import * as authActionCreators from './Redux/Actions/authActionCreators';

class App extends React.Component {

  componentDidMount(){
    this.props.loadUser();
  }

  render(){
    
  
    return (
      <div className="App">

        <Header />


        <Switch>
          <Route path='/' exact component={Homepage} />
          <Route path='/auth/login' exact component={Loginpage} />
          <Route path='/auth/register' exact component={Registerpage} />
          <Route path='/forgotpassword' exact component={ForgotPasswordPage} />
          <Route path='/resetPassword/:token' exact component={PasswordResetPage} />
          <Route path='/gallery' exact component={Gallery} />
          <Route path='/confirm-email' exact component={ConfirmEmail} />
          <Route path='/confirm-passwordReset' exact component={ConfirmPasswordReset} />
          <Route exact component={NotFound} />

        </Switch>


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: () => dispatch(authActionCreators.loadUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
