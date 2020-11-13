import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { BiCheck } from "react-icons/bi";
import { useHistory } from 'react-router-dom';

import AsideSection from './AsideSection';
import ProjectSection from './ProjectSection';
import RelatedProjects from './RelatedProjects';
import WorkingProjects from './WorkingProjects';
import WorkingDevelopers from './WorkingDevelopers';
import { FormSubmitButton } from '../style/Buttons';
import { THEME } from '../style/Theme';

const Profile = () => {
    const history = useHistory();
    const userProfile = useSelector((state) => state.LoggedUser);
    const currentUserProject = useSelector((state) => state.Project);
    const [technologies, setTechnologies] = React.useState(Object.keys(userProfile.technologies));
    const initialTechnologies = ['Node', 'Javascript', 'React', 'Mongo'];

    console.log('currentUserProject', currentUserProject.workingDevelopers)

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

                        {initialTechnologies.filter(technology => userProfile.technologies[technology])
                            .map((technology) => {
                                return (
                                    <List key={technology}>
                                        <BiCheck />{technology}
                                    </List>
                                );
                            })}
                    </UnordedList>
                </SectionTecs>
                <MyProject>
                    {userProfile.workingProjects.length ?
                        <>
                            <Header3>Working Projects</Header3>
                            <WorkingProjects />
                        </>
                        : <>
                            <Header3>Some Projects You May Be Interested...</Header3>
                            <RelatedProjects />
                            <SubmitButtonDiv>
                                <FormSubmitButton onClick={() => history.push("/projects")} >
                                    Find other Projects
                                </FormSubmitButton>
                            </SubmitButtonDiv>
                        </>
                    }
                </MyProject>
                <MyProject>
                    <Header3>My Project</Header3>
                    {userProfile.projectID
                        ?
                        <>
                            <ProjectSection />
                            {currentUserProject.workingDevelopers.length ?
                                <WorkingDevelopers />
                                : ''
                            }
                        </>
                        :
                        <SubmitButtonDiv>
                            <FormSubmitButton onClick={() => history.push("/form-project-2")} >
                                Add a Project
                                </FormSubmitButton>
                        </SubmitButtonDiv>
                    }
                </MyProject>
            </Main>
        </Wrapper >
    )
}

const Wrapper = styled.div`
    display: block;
    text-align: center;

    @media (min-width: ${THEME.mobile}){
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 40px auto;
        text-align: start;
    }
`

const Header3 = styled.h3`
    margin-bottom: 15px;
`

const Main = styled.main`
    width: 80%;
    margin: 0 auto;

    @media (min-width: ${THEME.mobile}){
        width: 63%;
        margin: 0;
    }
`

const SectionAbout = styled.section`
    padding: 20px;
    height: auto;
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
    @media (min-width: ${THEME.mobile}){
        display: flex;
        justify-content: space-evenly;  
    }
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

const SubmitButtonDiv = styled.div`
    text-align: center;
`

export default Profile;