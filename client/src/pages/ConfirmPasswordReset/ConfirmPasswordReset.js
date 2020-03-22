
import React from 'react';

import styles from './ConfirmPasswordReset.module.css';

import {Link } from 'react-router-dom';
import {connect } from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/authActionCreators';

class ConfirmPasswordReset extends React.Component{

    componentDidMount(){
        this.props.resetForgotPassword();
    }

    render(){

        return (

            <div className={styles.notFound}>
                
                <div className={styles.container}>

                    <h1 className={styles.header}>Password Reset Link Sent To Your Inbox</h1> 
                    <h3 className={styles.message}>Please use the provided link to change your password</h3> 

                    <Link to='/auth/login' className={styles.home}>LOGIN</Link>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetForgotPassword: () => dispatch(authActionCreators.resetForgotPasswordState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPasswordReset);