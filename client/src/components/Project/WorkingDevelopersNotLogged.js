import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from "react-router-dom";
import { THEME } from "../style/Theme";

const WorkingDevelopersNotLogged = ({ workingDevelopersArray }) => {
  const history = useHistory();

  const viewDeveloper = (email) => {
    history.push("/user/" + email);
  };

  return (
    <>
      <Header>Project's Team</Header>
      <Wrapper>
        <Row>
          {
            workingDevelopersArray.map((developer, index) =>
              <WorkingProjectContainer>
                <ProjectBtn
                  onClick={() => {
                    viewDeveloper(developer.email);
                  }}
                  key={`${developer._id}`} developer={developer}
                >
                  <Image src={"/uploads/" + developer.image} />
                </ProjectBtn>
                <ProjectName>{developer.firstName} {developer.lastName}</ProjectName>
              </WorkingProjectContainer>
            )
          }
        </Row>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    flex: 1;
`;

const Header = styled.h2`
    text-decoration: underline;
    text-align: center;
`

const Image = styled.img`
    border-radius: 50%;
    width: 100px;
    height: 100px;
`

const WorkingProjectContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px 5px;
  flex: 1 0 45%;

  @media (min-width: ${THEME.mobile}){
    max-width: 20%;
  }
`

const ProjectName = styled.h3`
  margin-top: 16px;
  font-size: 20px;
  text-align: center;
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

export default WorkingDevelopersNotLogged;