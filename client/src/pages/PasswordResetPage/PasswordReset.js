
import React from 'react';

import styles from './PasswordReset.module.css';

import {connect} from 'react-redux';

import * as authActionCreators from '../../Redux/Actions/authActionCreators';



class PasswordReset extends React.Component{


    state = {
        password: '',
        confirmPassword: '',
        token: ''
    }

    componentDidMount(){
        const token = this.props.match.params.token;
        this.setState({
            token: token
        });
    }


    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        if (this.state.password === this.state.confirmPassword && this.state.token){
            await this.props.resetPassword(this.state.password, this.state.token);
            
            this.props.history.push('/auth/login');
        }
    }


    render(){
        
        return (
            <div className={styles.login}>

                <div className={styles.container}>

                    <h1 className={styles.header}>RESET PASSWORD</h1>

                    <p className={styles.desc}>Enter your new password</p>
                    
                    <form className={styles.form} onSubmit={this.handleSubmit}>

                        <input className={styles.input} type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
                        <input className={styles.input} type="text" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleInputChange}/>
                        
                        

                        <input className={styles.submit} type="submit" value="SUBMIT"/>
                    </form>


                    
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
        resetPassword: (email, token) => dispatch(authActionCreators.resetPassword(email, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);