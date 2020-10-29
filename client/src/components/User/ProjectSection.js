import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

const ProjectSection = () => {
    const { name } = useParams();
    const userProject = useSelector((state) => state.Project);
    const history = useHistory();

    const viewProject = (name) => {
        fetch(`http://localhost:8080/project/${name}`, {
            method: 'GET',
            name
        })
            .then(res => res.json())
            .then((responseBody) => {
                const { status, data } = responseBody;
                if (status === 'success') {
                    history.push("/project/" + name);
                } else {
                    console.log('Error');
                }
            })
    };


    return (
        <ProjectBox
            onClick={() => {
                viewProject(userProject.name);
            }} >
            <ProjectImage src={"/uploads/" + userProject.image} />
            <ProjectDescription>
                <HeaderProject>{userProject.name}</HeaderProject>
                <p>{userProject.description}</p>

                {userProject.developers ? (userProject.developers) : <button> Select a developer </button>}
            </ProjectDescription>
        </ProjectBox >
    )
}

const ProjectImage = styled.img`
    width: 30%;
    min-width: 250px;
    margin-right: 15px;
`

const ProjectBox = styled.a`
    display: flex;
    text-decoration: inherit;
    color: inherit;
`

const HeaderProject = styled.h4`
    text-decoration: underline;
    margin-bottom: 5px;
`

const ProjectDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

export default ProjectSection;