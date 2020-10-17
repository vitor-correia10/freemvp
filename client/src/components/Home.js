import React from 'react';
import styled from 'styled-components/macro';

import ProjectSrc from './../assets/project_img.jpg';
import DeveloperSrc from './../assets/developer_img.jpg';

import { FcIdea } from "react-icons/fc";
import { GoRocket } from "react-icons/go";
import { MdDeveloperMode } from "react-icons/md";

const socialIconDim = { fontSize: "60px" };

const Home = () => {
    return (
        <>
            <Slideshow>
                <Banner type={project}>
                    <Header type={projectHeader}>
                        Do you have any project?
                </Header>
                    <MainAnchor type={projectColor} href="/form-project">
                        Submit a project
                </MainAnchor>
                </Banner>
                <Banner type={developer}>
                    <Header type={developerHeader}>
                        Let's make it happen!
                </Header>
                    <MainAnchor type={developerColor} href="/form-developer">
                        Developer subscription
                </MainAnchor>
                </Banner>
            </Slideshow>
            <MainSection>
                <div>
                    <StyledIdeaIcon />
                    <h3>Want start a business?</h3>
                    <p>Junior developers will...</p>
                </div>
                <div>
                    <StyledDeveloperIcon />
                    <h3>Make it happens!</h3>
                    <p>Build real projects and Grow a networking...</p>
                </div>
                <div>
                    <StyledRocketIcon />
                    <h3>FREE MVP</h3>
                    <p>Let's launch a project together!</p>
                </div>
            </MainSection>
        </>
    )
}

const Slideshow = styled.div`
    width: 100%;
    display: flex;
`

const MainAnchor = styled.a`
    padding: 10px 15px;
    border-radius: 10px;
    background: ${props => props.type.main};
    color: #000000;
    text-decoration: inherit;
    font-size: 18px;

    &:hover {
    transform: scale(1.05);
    transition: 0.4s ease-out;
    box-shadow: 0px 0px 3px 2px rgba(23,43,43,0.3);
  }
`

const Header = styled.h2`
    color: ${props => props.type.main};
    font-size: 30px;
    background: rgba(0,0,0,0.3);
    padding: 15px;
    border-radius: 10px;
`

const projectHeader = {
    main: '#000000',
};

const developerHeader = {
    main: '#ffffff',
};

const Banner = styled.div`
    width: 50%;
    height: 70vh;
    background-image: url(${props => props.type.main});
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
`

const project = {
    main: ProjectSrc,
};

const developer = {
    main: DeveloperSrc,
};

const projectColor = {
    main: '#d95b2e',
};

const developerColor = {
    main: '#3bad67',
};

const MainSection = styled.section`
    display: flex;
    justify-content: space-around;
`

const StyledIdeaIcon = styled(FcIdea)`
    font-size: ${socialIconDim.fontSize};
`;

const StyledDeveloperIcon = styled(MdDeveloperMode)`
    font-size: ${socialIconDim.fontSize};
`;

const StyledRocketIcon = styled(GoRocket)`
    font-size: ${socialIconDim.fontSize};
`;

export default Home;