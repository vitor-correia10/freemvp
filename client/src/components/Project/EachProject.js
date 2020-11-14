import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { THEME } from "../style/Theme";
import { useSelector, useDispatch } from "react-redux";
import { FormSubmitButton } from '../style/Buttons';
import { updateUser } from '../../Actions';

const EachProject = ({ project, children }) => {
  const loggedUserappliedToProjects = useSelector((state) => state.LoggedUser.appliedToProjects);
  const loggedUserId = useSelector((state) => state.LoggedUser._id);
  const loggedUserEmail = useSelector((state) => state.LoggedUser.email);
  const loggedPendingProjects = useSelector((state) => state.LoggedUser.pendingProjects);
  const loggedWorkingProjects = useSelector((state) => state.LoggedUser.workingProjects);

  let str = project.description;
  if (str.length > 150) str = str.substring(0, 150) + ' ...';

  const dispatch = useDispatch();
  const history = useHistory();

  const viewProject = (name) => {
    history.push("/project/" + name);
  };

  const matchProject = (name, email) => {
    fetch('http://localhost:8080/matchproject', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then(res => res.json())
      .then((responseBody) => {
        const { status, userData } = responseBody;
        if (status === 'success') {
          dispatch(updateUser(userData.appliedToProjects, 'appliedToProjects'))
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
      <ProjectDescription>{str}</ProjectDescription>
      { loggedUserId === project.admin ?
        <OwnProjectP>
          Your project
        </OwnProjectP>
        : loggedWorkingProjects.includes(project._id) ?
          <OwnProjectP>
            Working project
          </OwnProjectP>
          : loggedUserappliedToProjects.includes(project._id) || loggedPendingProjects.includes(project._id) ?
            <OwnProjectP>
              Pending request
          </OwnProjectP>
            : <SubmitButtonDiv>
              <ApplyButton onClick={() => {
                matchProject(project.name, loggedUserEmail);
              }}>Apply</ApplyButton>
            </SubmitButtonDiv>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px 5px;
  flex: 1 0 30%;
  max-width: 30%;
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

const OwnProjectP = styled.p`
  text-align: center;
  margin: 22px;
  font-size: 18px;
  padding: 5px 10px;
  color: gray;
  font-style: italic;
`
export default EachProject;
