import React from 'react';
import styled from 'styled-components/macro';

import Logo from '../Logo';
import Navbar from './Navbar';

const Header = () => {
    return (
        <Wrapper>
            <Logo />
            <Navbar />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: rgba(152, 152, 152, 0.3);
    width: 100%;
    display: flex;
    align-items: center;
    height: 70px;
    justify-content: space-between;
    padding: 0 20px 0 10px;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 10;
    backdrop-filter: blur(12px);
`

export default Header;