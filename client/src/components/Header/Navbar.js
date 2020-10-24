import React from 'react';
import { FormSubmitButton } from '../style/Buttons'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import LoginModal from "../Login/LoginModal";

import { removeLoggedInUser, toggleModal } from "../../Actions";

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogin = useSelector((state) => !!state.LoggedUser.email);
    const isOpen = useSelector((state) => state.modal.isOpen);

    return (
        <>
            <nav>
                {isOpen ? (
                    <LoginModal />
                ) : (
                        isLogin ? (
                            <a href="/">
                                <FormSubmitButton
                                    onClick={() => dispatch(removeLoggedInUser())}
                                >Log Out</FormSubmitButton>
                            </a>
                        )
                            : <FormSubmitButton
                                onClick={() => dispatch(toggleModal())}
                            >Log In</FormSubmitButton>
                    )
                }
            </nav>
        </ >
    )
}

export default Navbar;