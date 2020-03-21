
import React from 'react';

import styles from './RegisterPage.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {clearErrors} from '../../Redux/Actions/errorActionCreators';

import * as authActionCreators from '../../Redux/Actions/authActionCreators';

class Register extends React.Component{


    state = {
        username: '',
        email: '',
        password: '',
        msg: ''
    }

    componentDidUpdate(prevProps){

        if (this.props.error !== prevProps.error){
            //check for register error
            if (this.props.error.id === 'REGISTER_FAIL'){
                this.setState({
                    msg: this.props.error.msg.error
                });
            }else{
                this.setState({
                    msg: ''
                });
            }
        }

        // redirect if successfully registered
        if (this.props.registered){
            this.props.clearErrors();
            this.props.history.push('/auth/login');
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(this.state);
        await this.props.register(this.state.username, this.state.email, this.state.password);
        
    }


    render(){


        return (
            <div className={styles.register}>

                <div className={styles.container}>

                    <h1 className={styles.header}>REGISTER</h1>

                    <form className={styles.form} onSubmit={this.handleSubmit}>

                        <input className={styles.input} type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange}/>
                        <input className={styles.input} type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange}/>
                        <input className={styles.input} type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>

                        {this.state.msg ? <p style={{color: 'red', textAlign: 'center'}}>{this.state.msg}</p> : null }

                        <input className={styles.submit} type="submit" value="SUBMIT"/>
                    </form>

                
                    <Link to='/auth/login' className={styles.login}>Already have an account? Login</Link>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error,
        registered: state.auth.registered,

    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        register: (userName, email, password) => dispatch(authActionCreators.register(userName, email, password)),
        clearErrors: () => dispatch(clearErrors()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);