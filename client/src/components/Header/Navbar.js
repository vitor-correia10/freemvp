import React from 'react';
import { FormSubmitButton, ProfileButton } from '../style/Buttons'
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { GrNotification } from "react-icons/gr";
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';

import LoginModal from "../Modals/LoginModal";

import { removeLoggedInUser, toggleModal, removeLoggedInProject, removeRelatedProjects } from "../../Actions";

const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogin = useSelector((state) => !!state.LoggedUser.email);
    const isOpen = useSelector((state) => state.modal.isOpen);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const userProfile = useSelector((state) => state.LoggedUser);

    return (
        <>
            <nav>
                {isOpen ? (
                    <LoginModal />
                ) : (
                        isLogin ? (
                            <NavBarNav>
                                <NavUnordedList>
                                    <NavItem>
                                        <Anchor>
                                            <StyledNotificationIcon />
                                        </Anchor>
                                    </NavItem>
                                    <NavItem>
                                        <Anchor onClick={() => setDropdownOpen(!dropdownOpen)}>
                                            <Image src={"/uploads/" + userProfile.image} />
                                        </Anchor>
                                        {dropdownOpen &&
                                            <DropdownMenu>
                                                <DropdownItem>
                                                    <AnchorList href="/user">Profile</AnchorList>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <AnchorList href="/">
                                                        <LogOutButton onClick={() => {

                                                            dispatch(removeLoggedInUser())
                                                            dispatch(removeLoggedInProject())
                                                            dispatch(removeRelatedProjects())
                                                        }
                                                        } >
                                                            Log Out
                                                    </LogOutButton>

                                                    </AnchorList>
                                                </DropdownItem>
                                            </DropdownMenu>
                                        }
                                    </NavItem>
                                </NavUnordedList>
                            </NavBarNav>
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

const NavUser = styled.nav`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
`

const StyledNotificationIcon = styled(GrNotification)`
    font-size: 25px;
`;

const NavBarNav = styled.nav`
`

const NavUnordedList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
`

const NavItem = styled.li`
    width: calc(60px * 0.8);
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Anchor = styled.a`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 10px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid black;
    transition: transform 400ms ease-in-out;
    text-decoration: none;

    &:hover{
        transform: scale(1.1);
    }
`

const DropdownMenu = styled.div`
    position: absolute;
    top: 70px;
    width: 120px;
    transform: translateX(-28%);
    background: ${THEME.black};
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px 15px;
    overflow: hidden;
`

const DropdownItem = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    transition: background 300ms;
    padding: 0.5rem;
    justify-content: center;

    &:hover{
        background: ${THEME.primary};
    }
`

const AnchorList = styled.a`
    text-decoration: none;
    color: ${THEME.white};
`

const LogOutButton = styled.button`
    cursor: pointer;
    border: none;
    background: transparent;
    color: ${THEME.white};
    outline: none;
    font-size: 16px;
    padding: 0;
`

export default Navbar;