import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { THEME } from "../style/Theme";
import { useSelector } from "react-redux";
import { FormSubmitButton } from '../style/Buttons';

const EachProject = ({ project, children }) => {
  const loggedUserId = useSelector((state) => state.LoggedUser._id);
  const loggedUserEmail = useSelector((state) => state.LoggedUser.email);

  const history = useHistory();

  const viewProject = (name) => {
    history.push("/project/" + name);
  };

  const matchProject = (name) => {
    console.log('Project Name:', name);
    console.log('User email', loggedUserEmail);

    fetch('http://localhost:8080/project/matchProject', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email: loggedUserEmail,
      }),
    })
      .then(res => res.json())
      .then((responseBody) => {
        const { status, projectData, userData } = responseBody;
        if (status === 'success') {
          console.log('Success')
        } else {
          console.log('Error')
        }
      })
  }

  return (
    <Wrapper>
      <ProjectBtn
        onClick={() => {
          viewProject(project.name);
        }}
      >
        <ImageWrapper>
          <ProjectImage src={"/uploads/" + project.image} />
        </ImageWrapper>
      </ProjectBtn>
      <ProjectName>{project.name}</ProjectName>
      {children}
      <ProjectDescription>{project.description}</ProjectDescription>
      <SubmitButtonDiv>
        <ApplyButton onClick={() => {
          matchProject(project.name);
        }}>Apply</ApplyButton>
      </SubmitButtonDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px 5px;
  flex: 0 0 30%;
`;

const ImageWrapper = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
  height: 180px;
  text-align: center;
  position: relative;
  padding: 8px;
  border-radius: 4px;
`;

const ProjectImage = styled.img`
  max-width: 250px;
  width: 100%;
  height: auto;
`;

const ProjectName = styled.h3`
  margin-top: 16px;
  font-size: 20px;
  text-align: center;
`;

const ProjectDescription = styled.p`
  margin-top: 4px;
  font-size: 16px;
  height: 60px;
  overflow: auto;
  padding: 0 10px;
`;

const ProjectBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media (min-width: ${THEME.mobile}) {
    &:hover {
      transform: scale(1.05);
      transition: 0.5s ease-in;
    }
  }
`;


const ApplyButton = styled(FormSubmitButton)`
  width: 50%;
`

const SubmitButtonDiv = styled.div`
  text-align: center;
`
export default EachProject;
