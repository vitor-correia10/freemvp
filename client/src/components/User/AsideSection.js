import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';


const AsideSection = () => {
    const userProfile = useSelector((state) => state.LoggedUser);

    console.log(userProfile);
    return (
        <Wrapper>
            <Image src={"/uploads/" + userProfile.image} />
            <div>
                <Name>{userProfile.firstName} {userProfile.lastName}</Name>

                <Email>{userProfile.email}</Email>
            </div>
            <a href="/user/edit">
                Edit Profile
            </a>

        </Wrapper>
    )
}

const Wrapper = styled.aside`
    height: 50vh;
    max-height: 400px;
    border: 1px solid black;
    width: 25%;
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