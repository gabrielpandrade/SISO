import React from 'react';
import { useNavigate } from 'react-router-dom';
import { closeCaixa, checkCaixaStatus } from '../api/caixa';

function Logout() {
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleLogout = async () => {
            const userId = localStorage.getItem("userId");
            console.log(userId);
            if (!userId) {
                navigate('/login');
                return;
            }

            try {
                    await closeCaixa(userId);
                    localStorage.removeItem(userId);
                    navigate('/login');
            } catch (error) {
                localStorage.removeItem(userId);
                console.error("Erro ao realizar logout:", error.message);
                navigate('/login');
            }
        };

        handleLogout();
    }, [navigate]);

    return null;
}

export default Logout;
