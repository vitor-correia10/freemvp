import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
// import AsideSection from './AsideSectionUser';


const Profile = () => {
    const userProfile = useSelector((state) => state.LoggedUser);
    const technologies = userProfile.technologies;

    return (
        <Wrapper>
            <AsideSection>
                <img src={userProfile.image} />
                <div>
                    <p>{userProfile.firstName} {userProfile.lastName}</p>

                    <p>{userProfile.email}</p>
                </div>
            </AsideSection>
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
                                    {technology}
                                </List>
                            );
                        })}
                    </UnordedList>
                </SectionTecs>
                {userProfile.projectID
                    ? <ProjectSection>
                    </ProjectSection>
                    : ''
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

const AsideSection = styled.aside`
    height: 50vh;
    max-height: 400px;
    border: 1px solid black;
    width: 25%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    border-radius: 5px;
    justify-content: space-evenly;
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
`

const List = styled.li`
    line-height: 1.5;
`

const ProjectSection = styled.section`
    margin-top: 10px;
    border: 1px solid black;
    border-radius: 5px;
`

export default Profile;