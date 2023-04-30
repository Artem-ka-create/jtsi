import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Thanks.module.css'
const ThankYouJitsiComponent = () => {
    return (
        <>
            <p style={{ fontSize: '40px', color:'#757575' }}>Thanks for Call</p>
            <div style={{ textAlign: 'center',display:'flex', alignItems:'center',justifyContent:'center', flexDirection:'column' }}>
            <Link to="/"><button className={styles.btn}>To Start Page</button></Link>
            </div>
        </>
    );
}

export default ThankYouJitsiComponent;
