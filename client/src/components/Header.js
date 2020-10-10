import React from 'react';
import styled from 'styled-components/macro';

import Navbar from './Navbar';

const Header = () => {
    return (
        <Wrapper>
            <Navbar />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    text-align: center;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 10;
`

export default Header;