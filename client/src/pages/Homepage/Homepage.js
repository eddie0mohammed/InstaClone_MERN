
import React from 'react';

import styles from './Homepage.module.css';


class Homepage extends React.Component {


    render(){

        return (
            <div className={styles.homepage}>

                <p style={{textAlign: 'center', fontSize: '2rem'}}>Home</p>
            </div>
        )
    }
}

export default Homepage;