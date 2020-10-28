import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';


const ProjectSection = () => {
    const userProject = useSelector((state) => state.Project);
    console.log(userProject)
    return (
        <>
            {userProject.name}
        </>
    )
}



export default ProjectSection;