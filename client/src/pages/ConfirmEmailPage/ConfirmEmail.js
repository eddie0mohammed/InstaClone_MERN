
import React from 'react';

import styles from './ConfirmEmail.module.css';

import {Link } from 'react-router-dom';

class ConfirmEmail extends React.Component{

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

export default ConfirmEmail;