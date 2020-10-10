import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../components/style/Theme';

import ProjectSrc from './../assets/project_img.jpg';
import DeveloperSrc from './../assets/developer_img.jpg';

const Home = () => {
    return (
        <Wrapper>
            <Banner type={project}>
                <Header type={projectHeader}>
                    Do you have any project?
                </Header>
                <button>
                    Submit a project
                </button>
            </Banner>
            <Banner type={developer}>
                <Header type={developerHeader}>
                    Let's get your project off the paper!
                </Header>
                <button>
                    Developer subscription
                </button>
            </Banner>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
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
    filter: grayscale(1);
`

const project = {
    main: ProjectSrc,
};

const developer = {
    main: DeveloperSrc,
};

export default Home;