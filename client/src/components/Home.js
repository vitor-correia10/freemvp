import React from 'react';
import styled from 'styled-components/macro';

import {
    addCompletedProjects
} from '../Actions';

import ProjectsCompletedSection from "./Project/ProjectsCompletedSection";

import ProjectSrc from './../assets/project_img.jpg';
import DeveloperSrc from './../assets/developer_img.jpg';
import SlideshowSrc from './../assets/slideshow.jpg';

import { useSelector, useDispatch } from "react-redux";
import { FcIdea } from "react-icons/fc";
import { GoRocket } from "react-icons/go";
import { MdDeveloperMode } from "react-icons/md";
import { THEME } from "./style/Theme";

const socialIconDim = { fontSize: "60px" };

const Home = () => {
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();

    const isLogin = useSelector((state) => !!state.LoggedUser.email);

    const fetchCompletedProjects = async () => {
        const response = await fetch(`http://localhost:8080/`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then((responseBody) => {
                const { status, data } = responseBody;
                if (status === 'success') {
                    dispatch(addCompletedProjects(data));
                    setLoading(false);
                } else {
                    console.log('Error');
                }
            })
    };

    React.useEffect(() => {
        fetchCompletedProjects();
    }, []);
    if (loading) {
        return loading;
    }

    return (
        <>
            {isLogin ? (
                <LoggedAnchor href="/user">
                    <Slideshow>
                        <BannerLogged type={loggedIn}>
                            <Header type={projectHeader}>
                                See your progress...
                        </Header>
                        </BannerLogged>
                    </Slideshow>
                </LoggedAnchor>
            ) : (

                    <Slideshow>
                        <Banner type={project}>
                            <Header type={projectHeader}>
                                Do you have any project?
                            </Header>
                            <MainAnchor type={projectColor} href="/form-project-1">
                                Submit a project
                        </MainAnchor>
                        </Banner>
                        <Banner type={user}>
                            <Header type={userHeader}>
                                Let's make it happen!
                        </Header>
                            <MainAnchor type={userColor} href="/form-user">
                                Developer subscription
                        </MainAnchor>
                        </Banner>
                    </Slideshow>
                )}

            <MainSection>
                <Content>
                    <StyledIdeaIcon />
                    <h3>Want start a business?</h3>
                    <p>Junior developers will...</p>
                </Content>
                <Content>
                    <StyledUserIcon />
                    <h3>Make it happens!</h3>
                    <p>Build real projects and Grow a networking...</p>
                </Content>
                <Content>
                    <StyledRocketIcon />
                    <h3>FREE MVP</h3>
                    <p>Let's launch a project together!</p>
                </Content>
            </MainSection>
            <ProjectsCompletedSection />
        </>
    )
}

const Slideshow = styled.div`
    width: 100%;

    @media (min-width: ${THEME.mobile}){
        width: 100%;
        display: flex;
    }
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
    font-size: 24px;
    background: rgba(0,0,0,0.3);
    padding: 15px;
    border-radius: 10px;

    @media (min-width: ${THEME.mobile}){
        font-size: 30px;
    }
`

const projectHeader = {
    main: '#000000',
};

const userHeader = {
    main: '#ffffff',
};

const Banner = styled.div`
    background-image: url(${props => props.type.main});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 48vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;

    @media (min-width: ${THEME.mobile}){
        width: 50%;
        height: 60vh;

    }
`

const BannerLogged = styled.div`
    width: 100%;
    height: 60vh;
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

const user = {
    main: DeveloperSrc,
};

const loggedIn = {
    main: SlideshowSrc,
};

const projectColor = {
    main: '#d95b2e',
};

const userColor = {
    main: '#3bad67',
};

const MainSection = styled.section`
    @media (min-width: ${THEME.mobile}){
        display: flex;
        height: 30vh;
    }
`

const StyledIdeaIcon = styled(FcIdea)`
    font-size: ${socialIconDim.fontSize};
`;

const StyledUserIcon = styled(MdDeveloperMode)`
    font-size: ${socialIconDim.fontSize};
`;

const StyledRocketIcon = styled(GoRocket)`
    font-size: ${socialIconDim.fontSize};
`;

const Content = styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 3px 0px;

    @media (min-width: ${THEME.mobile}){
        height: 100%;
    }
`

const LoggedAnchor = styled.a`
    text-decoration: inherit;
`

export default Home;