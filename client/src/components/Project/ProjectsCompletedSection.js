import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { THEME } from "../style/Theme";

const ProjectCompletedSection = () => {
  const history = useHistory();
  const completedProjects = useSelector((state) => state.IsCompleted);

  const viewProject = (name) => {
    history.push("/project/" + name);
  };

  let completedProjectsArray = Object.keys(completedProjects).map(function (k) { return completedProjects[k] });

  function countStr(str) {
    if (str.length > 160) {
      str = str.substring(0, 160) + ' ...';
    }
    return str;
  }

  return (
    <>
      <Header>Some Completed Projects</Header>
      <Wrapper>
        <Row>
          {
            completedProjectsArray.map((project, index) =>
              <WorkingProjectContainer>
                <ProjectBtn
                  onClick={() => {
                    viewProject(project.name);
                  }}
                  key={`${project._id}`} project={project}
                >
                  <ImageWrapper>
                    <ProjectImage src={"/uploads/" + project.image} />
                  </ImageWrapper>
                </ProjectBtn>
                <ProjectName>{project.name}</ProjectName>
                <ProjectDescription>{countStr(project.description)}</ProjectDescription>
              </WorkingProjectContainer>
            )
          }
        </Row>
      </Wrapper>
    </>
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

const WorkingProjectContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px 5px;
  flex: 1 0 30%;

  @media (min-width: ${THEME.mobile}){
    max-width: 30%;
  }
`

const Header = styled.h2`
    text-decoration: underline;
    text-align: center;
    margin-top: 40px;
`

const SpanTec = styled.span`
  margin: 5px;
`

const Paragraph = styled.p`
  display: flex;
  justify-content: space-around;
  background: ${THEME.primary};
  margin-bottom: 10px;
`

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

export default ProjectCompletedSection;