import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { THEME } from "../style/Theme";
import { FormSubmitButton } from '../style/Buttons';

const EachUser = ({ user, children }) => {
    const history = useHistory();

    const viewUser = (email) => {
        history.push("/user/" + email);
    };

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
            <SubmitButtonDiv>
                <ApplyButton>Match</ApplyButton>

            </SubmitButtonDiv>
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
  height: 180px;
  align-items: center;
  position: relative;
  margin-top: 15px;
  border-radius: 4px;
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


const ApplyButton = styled(FormSubmitButton)`
  width: 50%;
`

const SubmitButtonDiv = styled.div`
  text-align: center;
`
export default EachUser;
