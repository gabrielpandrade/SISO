import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/components/Footer.module.css';

function Footer({ buttons = [] }) {  // Define um valor padrão para buttons
    const renderButton = (button) => {
        const { type, text, onClick } = button;
        return (
            <button
                key={text}
                className={`${styles.button} ${styles[type]}`}
                onClick={onClick}
            >
                {text}
            </button>
        );
    };

    return (
        <div className={styles.footer}>
            {buttons.length > 0 ? buttons.map(renderButton) : null}
        </div>
    );
}

Footer.propTypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
            type: PropTypes.string,
        })
    )
};

export default Footer;
