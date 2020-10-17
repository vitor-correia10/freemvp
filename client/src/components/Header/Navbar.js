import React from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from "react-redux";

import LoginModal from "../Login/LoginModal";

import { toggleLogin, toggleModal } from "../../Actions";

const Navbar = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.login.isLogin);
    const isOpen = useSelector((state) => state.modal.isOpen);

    return (
        <>
            <nav>
                {isOpen ? (
                    <LoginModal />
                ) : (
                        isLogin ? (
                            <button
                                onClick={() => dispatch(toggleLogin())}
                            >Log Out</button>
                        )
                            : <button
                                onClick={() => dispatch(toggleModal())}
                            >Log In</button>
                    )
                }
            </nav>
        </ >
    )
}

export default Navbar;