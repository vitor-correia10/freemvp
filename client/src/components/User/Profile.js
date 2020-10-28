import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { BiCheck } from "react-icons/bi";

import AsideSection from './AsideSection';
import ProjectSection from './ProjectSection';


const Profile = () => {
    const userProfile = useSelector((state) => state.LoggedUser);
    const [technologies, setTechnologies] = React.useState(Object.keys(userProfile.technologies));

    return (
        <Wrapper>
            <AsideSection />
            <Main>
                <SectionAbout>
                    <Header3>About Me</Header3>
                    <div>{userProfile.about ? userProfile.about : <NoData>No info to show</NoData>}</div>
                </SectionAbout>
                <SectionTecs>
                    <Header3>Technologies</Header3>
                    <UnordedList>

                        {technologies.map((technology) => {
                            return (
                                <List key={technology}>
                                    <BiCheck />{technology}
                                </List>
                            );
                        })}
                    </UnordedList>
                </SectionTecs>
                <MyProject>
                    <Header3>My Project</Header3>
                    {userProfile.projectID
                        ? <ProjectSection />
                        : <button>
                            Add a Project
                        </button>
                    }
                </MyProject>
            </Main>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 40px auto;
`

const Header3 = styled.h3`
    margin-bottom: 15px;
`

const Main = styled.main`
    width: 63%;
`

const SectionAbout = styled.section`
    padding: 20px;
    height: 30vh;
    border: 1px solid black;
    border-radius: 5px;
`

const SectionTecs = styled.section`
    padding: 20px;
    height: auto;
    margin-top: 10px;
    border: 1px solid black;
    border-radius: 5px;
`

const UnordedList = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: space-evenly;
`

const List = styled.li`
    line-height: 1.5;
`

const MyProject = styled.section`
    padding: 20px;
    margin-top: 10px;
    border: 1px solid black;
    border-radius: 5px;
`

const NoData = styled.p`
    font-style: italic;
    font-size: 14px;
    color: gray;
`

export default Profile;