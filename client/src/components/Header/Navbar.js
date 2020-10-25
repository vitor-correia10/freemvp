import React from 'react';
import { FormSubmitButton, ProfileButton } from '../style/Buttons'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { GrNotification } from "react-icons/gr";
import styled from 'styled-components/macro';

import LoginModal from "../Modals/LoginModal";

import { removeLoggedInUser, toggleModal } from "../../Actions";

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogin = useSelector((state) => !!state.LoggedUser.email);
    const isOpen = useSelector((state) => state.modal.isOpen);
    const userProfile = useSelector((state) => state.LoggedUser);

    return (
        <>
            <nav>
                {isOpen ? (
                    <LoginModal />
                ) : (
                        isLogin ? (
                            <NavUser>
                                <a href="/">
                                    <ProfileButton
                                        onClick={() => dispatch(removeLoggedInUser())}
                                    >
                                        <Image src={"/uploads/" + userProfile.image} />
                                    </ProfileButton>
                                </a>
                                <StyledNotificationIcon />

                            </NavUser>
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

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const NavUser = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
`

const StyledNotificationIcon = styled(GrNotification)`
    font-size: 25px;
`;

export default Navbar;