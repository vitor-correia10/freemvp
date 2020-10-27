import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import AsideSection from './AsideSection';
import { BiCheck } from "react-icons/bi";


const Profile = () => {
    const userProfile = useSelector((state) => state.LoggedUser);
    const [technologies, setTechnologies] = React.useState(Object.keys(userProfile.technologies));

    return (
        <Wrapper>
            <AsideSection />
            <Main>
                <SectionAbout>
                    <h3>About Me</h3>
                    <Description>{userProfile.about}</Description>
                </SectionAbout>
                <SectionTecs>
                    <h3>Technologies</h3>
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
                {userProfile.projectID
                    ? <ProjectSection>
                        <h3>My Project</h3>
                    </ProjectSection>
                    : <button>
                        Add a Project
                        </button>
                }
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

const Description = styled.p`
    margin-top: 15px;
`

const UnordedList = styled.ul`
    margin-top: 15px;
    list-style-type: none;
    display: flex;
    justify-content: space-evenly;
`

const List = styled.li`
    line-height: 1.5;
`

const ProjectSection = styled.section`
    padding: 20px;
    margin-top: 10px;
    border: 1px solid black;
    border-radius: 5px;
`

export default Profile;