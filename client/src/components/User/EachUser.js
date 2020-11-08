import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { THEME } from "../style/Theme";
import { FormSubmitButton } from '../style/Buttons';
import { useSelector, useDispatch } from "react-redux";
import { updateProject } from '../../Actions';

const EachUser = ({ user, children }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedProject = useSelector((state) => state.Project);
  const projectAppliedToDevelopers = useSelector((state) => state.Project.appliedToDevelopers);
  const [appliedToDevelopers, setAppliedToDevelopers] = React.useState(projectAppliedToDevelopers);

  const viewUser = (email) => {
    history.push("/user/" + email);
  };

  const matchUser = (name, email) => {
    fetch('http://localhost:8080/matchuser', {
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
        const { status, projectData } = responseBody;
        if (status === 'success') {
          dispatch(updateProject(projectData.appliedToDevelopers, 'appliedToDevelopers'));
          setAppliedToDevelopers(...appliedToDevelopers, projectData.appliedToDevelopers);
        } else {
          console.log('Error')
        }
      })
  }

  return (
    <Wrapper>
      <UserBtn
        onClick={() => {
          viewUser(user.email);
        }}
      >
        <ImageWrapper>
          <UserImage src={"/uploads/" + user.image} />
        </ImageWrapper>
      </UserBtn>
      <UserName>{user.firstName} {user.lastName}</UserName>
      {children}
      { user.description ?
        <UserDescription>{user.description}</UserDescription>
        : ''
      }
      {appliedToDevelopers.includes(user._id) ?
        <OwnProjectP>
          Pending request
      </OwnProjectP>
        : <SubmitButtonDiv>
          <ApplyButton onClick={() => {
            matchUser(loggedProject.name, user.email);
          }}>Match</ApplyButton>

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
  margin: 0 5px;
  flex: 0 0 30%;
`;

const ImageWrapper = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 15px;
  border-radius: 4px;

  @media (min-width: ${THEME.mobile}){
    height: 150px;
  }
`;

const UserImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const UserName = styled.h3`
  margin-top: 16px;
  font-size: 20px;
  text-align: center;
`;

const UserDescription = styled.p`
  margin-top: 4px;
  font-size: 16px;
  height: 60px;
  overflow: auto;
  padding: 0 10px;
`;

const UserBtn = styled.button`
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

const OwnProjectP = styled.p`
  text-align: center;
  margin: 22px;
  font-size: 18px;
  padding: 5px 10px;
  color: gray;
  font-style: italic;
`

const ApplyButton = styled(FormSubmitButton)`
  width: 50%;
`

const SubmitButtonDiv = styled.div`
  text-align: center;
`
export default EachUser;
