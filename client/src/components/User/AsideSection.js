import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';


const AsideSection = () => {
    const userProfile = useSelector((state) => state.LoggedUser);

    console.log(userProfile);
    return (
        <>
            <img src={userProfile.image} />

            <div>
                {userProfile.firstName} {userProfile.lastName}
            </div>
        </>
    )
}



export default AsideSection;