import React from "react";
import styled from "styled-components/macro";
import { THEME } from "../style/Theme";
import { useSelector } from 'react-redux';

export const PendingUsers = () => {
    const userProject = useSelector((state) => state.Project);
    const userProjectPendingDevelopers = useSelector((state) => state.Project.pendingDevelopers);
    console.log('userProject', userProject);
    return (
        <>
            {/* {userProjectPendingDevelopers.map((pendingDeveloper) =>
                <div>{pendingDeveloper.firstName}</div>
            )} */}
        </>
    );
};

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  padding: 70px 0;

  @media (min-width: ${THEME.mobile}) {
    width: 30%;
    padding: 40px 0;
  }
`;


export default PendingUsers;
