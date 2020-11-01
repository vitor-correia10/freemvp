import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { THEME } from "../style/Theme";

const EachProject = ({ project, children }) => {
    const history = useHistory();

    const viewProject = (name) => {
        history.push("/project/" + name);
    };

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
            <ProjectPrice>{project.description}</ProjectPrice>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px 5px;
  flex: 0 0 32.58%;
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
  width: 60%;
  height: auto;
`;

const ProjectName = styled.h3`
  margin-top: 16px;
  font-size: 20px;
  text-align: center;
`;

const ProjectPrice = styled.p`
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

export default EachProject;
