import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { FormSubmitButton } from "../style/Buttons";
import { THEME } from "../style/Theme";
import RelatedUsersPerProject from './RelatedUsersPerProject';

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
        <>
            <ProjectBox>
                <ImageAnchor onClick={() => {
                    viewProject(userProject.name);
                }} >
                    <ProjectImage src={"/uploads/" + userProject.image} />
                </ImageAnchor>
                <ProjectDescription>
                    <HeaderProject>{userProject.name}</HeaderProject>
                    <p>{userProject.description}</p>

                </ProjectDescription>
            </ProjectBox >
            {userProject.developers.length ?
                userProject.developers.map((developer) =>
                    <div key={`${developer._id}`} >
                        {developer.firstName}
                    </div>
                )
                : userProject.relatedUsers.length ?
                    <RelatedUsersPerProject />
                    : ""
            }
        </>
    )
}

const ProjectImage = styled.img`
    width: 30%;
    min-width: 250px;
`

const ImageAnchor = styled.a`
    margin-right: 15px;
    cursor: pointer;
    min-width: 250px;
    width: 30%;

    &:hover {
    transform: scale(1.05);
    transition: 0.5s ease-in;
  }
`

const ProjectBox = styled.div`

    @media (min-width: ${THEME.mobile}){
        display: flex;
        text-decoration: inherit;
        color: inherit;
    }
`

const HeaderProject = styled.h4`
    text-decoration: underline;
    margin-bottom: 5px;
`

const ProjectDescription = styled.div`
    @media (max-width: ${THEME.mobile}){
        margin-top: 20px;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-around;
`


export default ProjectSection;