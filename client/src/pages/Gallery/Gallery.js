
import React from 'react';

import styles from './Gallery.module.css';


class Gallery extends React.Component {


    render(){

        return (
            <div className={styles.gallery}>

                <p style={{textAlign: 'center', fontSize: '2rem'}}>Gallery</p>
            </div>
        )
    }
}

export default Gallery;