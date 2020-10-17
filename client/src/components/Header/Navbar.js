import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from "react-redux";

import LoginModal from "../Login/LoginModal";

import { toggleLogin } from "../../Actions";

const Navbar = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.login.isLogin);

    return (
        <>
            <nav>
                {isLogin ? (
                    <LoginModal />
                ) : (
                        <button
                            onClick={() => dispatch(toggleLogin())}
                        >Log In</button>
                    )}
            </nav>
        </ >
    )
}

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
`;



export default Navbar;