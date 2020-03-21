
import React from 'react';

import styles from './PasswordReset.module.css';



class PasswordReset extends React.Component{


    state = {
        password: '',
        confirmPassword: ''
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
            password: '',
            confirmPassword: ''

        });
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

export default PasswordReset;