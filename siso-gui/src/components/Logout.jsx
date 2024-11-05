import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleLogout = async () => {
            try {
                navigate('/login');
            } catch (error) {
                throw error;
            }
        };
        handleLogout();
    }, [navigate]);

    return null;
}

export default Logout;
