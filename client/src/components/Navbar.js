import React from 'react';
import styled from 'styled-components/macro';
import Logo from './Logo';
import { useSelector, useDispatch } from "react-redux";

import { toggleLogin } from "../Actions";

const Navbar = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.login.isLogin);

    return (
        <Wrapper>
            <Logo />
            <nav>
                {isLogin ? (
                    <StyledUserContainer>
                        <p>
                            name
                        </p>
                        <button
                            onClick={() => dispatch(toggleLogin())}
                        >Log out</button>
                    </StyledUserContainer>
                ) : (
                        <button
                            onClick={() => dispatch(toggleLogin())}
                        >Log In</button>
                    )}
            </nav>
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

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
`;



export default Navbar;