import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { toggleModal, updateUser } from "../../Actions";
import { useDispatch } from "react-redux";
import EditUserModal from "../Modals/EditUserModal";

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
            <button onClick={() => dispatch(toggleModal())}>
                Edit Profile
            </button>
            {isOpen ? (
                <EditUserModal />
            ) : ""
            }
        </Wrapper>
    )
}

const Wrapper = styled.aside`
    height: 50vh;
    max-height: 400px;
    width: 20%;
    min-width: 250px;
    border: 1px solid black;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    border-radius: 5px;
    justify-content: space-evenly;
    text-align: center;
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

export default AsideSection;