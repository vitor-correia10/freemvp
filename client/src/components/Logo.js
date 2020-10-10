import React from 'react';
import logo from '../assets/logo.png';

const Logo = () => {
    return (
        <a href="/">
            <img
                src={logo}
                alt="logo"
            />
        </a>
    )
}

export default Logo;