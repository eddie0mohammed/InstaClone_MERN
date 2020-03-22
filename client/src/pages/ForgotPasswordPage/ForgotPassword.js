
import React from 'react';

import styles from './ForgotPassword.module.css';

import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/authActionCreators';


class ForgotPassword extends React.Component{


    state = {
        email: '',
    }

    componentDidUpdate(prevProps){
        if (prevProps.passwordReset !== this.props.passwordReset){
            this.props.history.push('/confirm-passwordReset');
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

       await this.props.forgotPassword(this.state.email);
    }


    render(){

        return (
            <div className={styles.login}>

                <div className={styles.container}>

                    <h1 className={styles.header}>FORGOT PASSWORD</h1>

                    <p className={styles.forgot}>Enter your email. A password reset link will be sent to your email.</p>
                    
                    
                    <form className={styles.form} onSubmit={this.handleSubmit}>

                        <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
                        

                        <input className={styles.submit} type="submit" value="SUBMIT"/>
                    </form>


                    
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        passwordReset: state.auth.passwordReset
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => dispatch(authActionCreators.forgotPassword(email)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);