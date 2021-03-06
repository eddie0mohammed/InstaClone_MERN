
import React from 'react';

import styles from './ConfirmEmail.module.css';

import {Link } from 'react-router-dom';
import {connect } from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/authActionCreators';

class ConfirmEmail extends React.Component{

    componentDidMount(){
        this.props.turnRegisterToFalse();
    }

    render(){

        return (

            <div className={styles.notFound}>
                
                <div className={styles.container}>

                    <h1 className={styles.header}>Confirmation Email Sent To Your Inbox</h1> 
                    <h3 className={styles.message}>Please confirm your email in order to login</h3> 

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
        turnRegisterToFalse: () => dispatch(authActionCreators.turnRegisterToFalse()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);