
import React from 'react';

import styles from './LoginPage.module.css';

import {Link } from 'react-router-dom';
import {connect } from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/authActionCreators';
import {clearErrors} from '../../Redux/Actions/errorActionCreators';

class Login extends React.Component{


    state = {
        email: '',
        password: '',
        msg: ''
    }

    componentDidMount(){
        this.props.turnRegisterToFalse();
        this.props.resetResetPasswordChanged();
    }

    componentDidUpdate(prevProps){

        if (this.props.error !== prevProps.error){
            //check for register error
            if (this.props.error.id === 'LOGIN_FAIL'){
                this.setState({
                    msg: this.props.error.msg.error
                });
            }else{
                this.setState({
                    msg: ''
                });
            }
        }

        //check if authenticated; if yes => redirect
        if (this.props.isAuthenticated){
            this.props.clearErrors();
            this.props.history.push('/gallery');
        }

        
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await this.props.login(this.state.email, this.state.password);

    }


    render(){

        return (
            <div className={styles.login}>

                <div className={styles.container}>

                    <h1 className={styles.header}>LOGIN</h1>

                    <form className={styles.form} onSubmit={this.handleSubmit}>

                        <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
                        <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>

                        {this.state.msg ? <p style={{color: 'red', textAlign: 'center'}}>{this.state.msg}</p> : null }
                        <input className={styles.submit} type="submit" value="SUBMIT"/>
                    </form>

                    <Link to="/forgotpassword" className={styles.forgot}>Forgot your password?</Link>

                    <Link to='/auth/register' className={styles.register}>Register</Link>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        turnRegisterToFalse: () => dispatch(authActionCreators.turnRegisterToFalse()),
        login: (email, password) => dispatch(authActionCreators.login(email, password)),
        clearErrors: () => dispatch(clearErrors()),
        resetResetPasswordChanged: () => dispatch(authActionCreators.reset_resetPassword_state()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);