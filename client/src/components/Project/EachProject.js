import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { THEME } from "../style/Theme";
import { useSelector, useDispatch } from "react-redux";
import { FormSubmitButton } from '../style/Buttons';
import { updateUser, toggleModal } from '../../Actions';
import { AiFillCheckCircle } from "react-icons/ai";

const checkedIcon = { height: "20px", width: "20px" };

const EachProject = ({ project, children }) => {
  const loggedUserappliedToProjects = useSelector((state) => state.LoggedUser.appliedToProjects);
  const loggedUserId = useSelector((state) => state.LoggedUser._id);
  const loggedUserEmail = useSelector((state) => state.LoggedUser.email);
  const loggedPendingProjects = useSelector((state) => state.LoggedUser.pendingProjects);
  const loggedWorkingProjects = useSelector((state) => state.LoggedUser.workingProjects);

  let str = project.description;
  if (str.length > 140) str = str.substring(0, 140) + ' ...';

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
        : project.isCompleted ?
          <OwnProjectP>
            <StyledChecked /> Completed
          </OwnProjectP>
          : loggedWorkingProjects.includes(project._id) ?
            <OwnProjectP>
              Working project
          </OwnProjectP>
            : loggedUserappliedToProjects.includes(project._id) || loggedPendingProjects.includes(project._id) ?
              <OwnProjectP>
                Pending request
          </OwnProjectP>
              :
              loggedUserId.length < 1 ?
                <SubmitButtonDiv>
                  <ApplyButton
                    onClick={() => dispatch(toggleModal())}
                  >Apply</ApplyButton>
                </SubmitButtonDiv>
                :
                <SubmitButtonDiv>
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
  flex: 1 0 30%;
  margin: 24px 20px;

  @media (min-width: ${THEME.mobile}) {
    max-width: 30%;
    margin: 24px 5px;
  }
`;

const ImageWrapper = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  position: relative;
  border-radius: 4px;

  @media (min-width: ${THEME.mobile}) {
    height: 180px;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;

  @media (min-width: ${THEME.mobile}) {
    max-width: 250px;
  }
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
  padding: 0;

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
  margin: 22px;
  font-size: 18px;
  padding: 5px 10px;
  color: gray;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledChecked = styled(AiFillCheckCircle)`
  width: ${checkedIcon.width};
  height: ${checkedIcon.height};
  margin-right: 5px;
`;

export default EachProject;
