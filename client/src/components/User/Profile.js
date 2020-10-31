import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { BiCheck } from "react-icons/bi";
import { useHistory } from 'react-router-dom';

import AsideSection from './AsideSection';
import ProjectSection from './ProjectSection';
import { FormSubmitButton } from '../style/Buttons';


const Profile = () => {
    const history = useHistory();
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
                        : <FormSubmitButton onClick={() => history.push("/form-project-2")} >
                            Add a Project
                        </FormSubmitButton>
                    }
                </MyProject>
                <MyProject>
                    {userProfile.workingProject ?
                        <Header3>Working Project</Header3>
                        : <>
                            <Header3>Some Projects You May Be Interested</Header3>
                            <FormSubmitButton onClick={() => history.push("/projects")} >
                                Find a Project
                            </FormSubmitButton>
                        </>
                    }
                </MyProject>
            </Main>
        </Wrapper >
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
    height: 20vh;
    min-height: 100px;
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