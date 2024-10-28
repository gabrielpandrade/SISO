import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ErrorPopup from './ErrorPopup';
import styles from '../styles/components/Dashboard.module.css';
import Header from "./Header";

const Dashboard = ({ children, title, error, currentScreen}) => {
    const [erro, setError] = useState(error);
    const[admin, setAdmin] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('userIsAdmin');
            if(user){
                setAdmin(true);
            };
        setError(error);
    }, [error]);

    const handleCloseError = () => {
        setError(null);
    };

    return (
        <div className={styles.dashboard}>
            <Sidebar showUsers={admin} currentScreen={currentScreen}/>
            <div className={styles.mainContent}>
                <Header/>
                <div className={styles.contentWrapper}>
                    {children}
                </div>
            </div>

            <ErrorPopup message={erro} onClose={handleCloseError}/>
        </div>
    );
};

export default Dashboard;
