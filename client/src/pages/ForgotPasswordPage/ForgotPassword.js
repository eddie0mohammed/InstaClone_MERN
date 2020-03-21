
import React from 'react';

import styles from './ForgotPassword.module.css';



class ForgotPassword extends React.Component{


    state = {
        email: '',
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({
            email: '',

        });
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

export default ForgotPassword;