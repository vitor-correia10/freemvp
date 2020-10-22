import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';


const Profile = () => {
    const userProfile = useSelector((state) => state.User);

    console.log(userProfile);
    return (
        <div>
            Hello {userProfile.firstName}
        </div>
    )
}



export default Profile;