import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { THEME } from "../style/Theme";

const WorkingProjects = () => {
  const workingProjects = useSelector((state) => state.WorkingProjects);

  const history = useHistory();

  const viewProject = (name) => {
    history.push("/project/" + name);
  };

  let workingProjectsArray = Object.keys(workingProjects).map(function (k) { return workingProjects[k] });

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
          workingProjectsArray.map((project, index) =>
            <WorkingProjectContainer>
              <ProjectBtn
                onClick={() => {
                  viewProject(project.name);
                }}
                key={`${project._id}`} project={project}
              >
                <ImageWrapper>
                  <ProjectImage src={"/uploads/" + project.image} />
                  {project.isCompleted ?
                    <Span>Completed</Span> : ''
                  }
                </ImageWrapper>
              </ProjectBtn>
              <ProjectName>
                {project.name}
              </ProjectName>
              <Paragraph>
                {Object.keys(project.technologies).map((technology) =>
                  <SpanTec key={technology}>{technology}</SpanTec>
                )}
              </Paragraph>
              <ProjectDescription>{countStr(project.description)}</ProjectDescription>
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
  margin: 8px;
  overflow: hidden;
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

const Span = styled.span`
    font-weight: 700;
    color: black;
    height: 25px;
    font-size: 18px;
    transform: rotate(322deg);
    width: 290px;
    top: 80px;
    background: rgba(59, 173, 103, 0.8);
    opacity: 0.;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default WorkingProjects;