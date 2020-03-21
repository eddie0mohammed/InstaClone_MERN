
import React from 'react';

import styles from './NotFound.module.css';

import {Link } from 'react-router-dom';

class NotFound extends React.Component{

    render(){

        return (

            <div className={styles.notFound}>
                
                <div className={styles.container}>

                    <h1 className={styles.header}>Page Not Found</h1> 

                    <Link to='/' className={styles.home}>HOME</Link>

                </div>
            </div>
        )
    }
}

export default NotFound;