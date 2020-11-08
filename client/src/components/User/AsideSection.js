import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { toggleModal, updateUser } from "../../Actions";
import { useDispatch } from "react-redux";
import EditUserModal from "../Modals/EditUserModal";
import { FormSubmitButton } from "../style/Buttons";
import { THEME } from '../style/Theme';

const AsideSection = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.isOpen);
    const userProfile = useSelector((state) => state.LoggedUser);
    return (
        <Wrapper>
            <Image src={"/uploads/" + userProfile.image} />
            <div>
                <Name>{userProfile.firstName} {userProfile.lastName}</Name>

                <Email>{userProfile.email}</Email>
            </div>
            <ProfileButton onClick={() => dispatch(toggleModal())}>
                Edit Profile
            </ProfileButton>
            {isOpen ? (
                <EditUserModal />
            ) : ""
            }
        </Wrapper>
    )
}

const Wrapper = styled.aside`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 40px;

    @media (min-width: ${THEME.mobile}){
        height: 50vh;
        max-height: 400px;
        width: 20%;
        min-width: 250px;
        margin-right: 10px;
        border-radius: 5px;
        text-align: center;
        margin-top: 0;
    }
`

const Image = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
`

const Name = styled.p`
    font-size: 20px;
    margin-bottom: 5px;
`

const Email = styled.p`
    font-size: 14px;
    color: gray;
`

const ProfileButton = styled(FormSubmitButton)`
    font-size: 15px;
`

export default AsideSection;