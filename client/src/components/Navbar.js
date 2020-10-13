import React from 'react';
import styled from 'styled-components/macro';
import Logo from './Logo';

import { THEME } from '../components/style/Theme';


const Navbar = () => {
    const [appUser, setAppUser] = React.useState(false);
    return (
        <Wrapper>
            <Logo />
            <StyledHeader>
                {appUser ? (
                    <StyledUserContainer>
                        <p>
                            {appUser.name}
                        </p>
                        <button
                            onClick={() => setAppUser(!appUser)}
                        >Log out</button>
                    </StyledUserContainer>
                ) : (
                        <button
                            onClick={() => setAppUser(!appUser)}
                        >Log In</button>
                    )}
            </StyledHeader>
        </Wrapper >
    )
}

const Wrapper = styled.div`
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    display: flex;
    align-items: center;
    height: 70px;
    justify-content: space-between;
    padding: 0 20px 0 10px;
`

const StyledHeader = styled.nav`
`;

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default Navbar;