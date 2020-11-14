import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { THEME } from "../style/Theme";

const WorkingDevelopers = () => {
  const workingDevelopers = useSelector((state) => state.WorkingDevelopers);

  const history = useHistory();

  const viewDeveloper = (email) => {
    history.push("/user/" + email);
  };

  let workingDevelopersArray = Object.keys(workingDevelopers).map(function (k) { return workingDevelopers[k] });

  function countStr(str) {
    if (str.length > 85) {
      str = str.substring(0, 85) + ' ...';
    }
    return str;
  }

  return (
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
              <Paragraph>
                {Object.keys(developer.technologies).map((technology) =>
                  <SpanTec key={technology}>{technology}</SpanTec>
                )
                }
              </Paragraph>
              <ProjectDescription>{countStr(developer.about)}</ProjectDescription>
            </WorkingProjectContainer>
          )
        }
      </Row>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: block;

  @media (min-width: ${THEME.mobile}) {
    display: flex;
    flex-direction: row;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${THEME.mobile}) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    flex: 1;
  }
`;

const Image = styled.img`
    border-radius: 50%;
    width: 120px;
    height: 120px;
`

const WorkingProjectContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px 5px;
  flex: 1 0 30%;
  max-width: 30%;
`

const SpanTec = styled.span`
  margin: 5px;
`

const Paragraph = styled.p`
  display: flex;
  justify-content: space-around;
  background: ${THEME.secondary};
  margin-bottom: 10px;
`

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

export default WorkingDevelopers;