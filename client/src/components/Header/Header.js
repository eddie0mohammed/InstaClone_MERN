
import React from 'react';

import styles from './Header.module.css';

import {Link } from 'react-router-dom';

import {connect } from 'react-redux';

import {logout} from '../../Redux/Actions/authActionCreators';


const Header = (props) => {
    
    return (
        <div className={styles.header}>

            <div className={styles.logo}>LOGO</div>

            <Link to='/' className={styles.btn}>Home</Link>

            { !props.isAuthenticated ? 
                <div className={styles.btns}>
                    <Link to="/auth/login" className={styles.btn}>Login</Link>
                    <Link to='/auth/register' className={styles.btn}>Register</Link>
                </div>
            :
                <div className={styles.btns}>
                    <div className={styles.btn}>Settings</div>
                    <div className={styles.btn} onClick={props.logout}>Logout</div>
                </div>
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);