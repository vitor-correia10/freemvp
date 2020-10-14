import React from 'react';
import styled from 'styled-components/macro';

import ProjectSrc from './../assets/project_img.jpg';
import DeveloperSrc from './../assets/developer_img.jpg';

const Home = () => {
    return (
        <Wrapper>
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
                    Let's get your project off the paper!
                </Header>
                <MainAnchor type={developerColor} href="/form-developer">
                    Developer subscription
                </MainAnchor>
            </Banner>
        </Wrapper>
    )
}

const Wrapper = styled.div`
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

export default Home;