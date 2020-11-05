import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { THEME } from "../style/Theme";
import EachUser from "./EachUser";


const RelatedUsersPerProject = () => {
    const relatedUsers = useSelector((state) => state.RelatedUsers);

    let relatedUsersArray = Object.keys(relatedUsers).map(function (k) { return relatedUsers[k] });

    return (
        <>
            {
                relatedUsersArray.map((user, index) =>
                    <MatchUsersContainer key={`${user._id}`}>
                        <h4>Match with your project... </h4>
                        <Wrapper>
                            <Row>

                                <EachRelatedProject key={`${user._id}`} user={user}>
                                    <Paragraph>
                                        {Object.keys(user.technologies).map((technology) =>
                                            <SpanTec key={technology}>{technology}</SpanTec>
                                        )
                                        }
                                    </Paragraph>
                                </EachRelatedProject>

                            </Row>
                        </Wrapper>
                    </MatchUsersContainer>
                )
            }
        </>
    )
}

const Wrapper = styled.div`
  display: block;

  @media (min-width: ${THEME.mobile}) {
    display: flex;
    flex-direction: row;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;  

  @media (min-width: ${THEME.mobile}) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
`;


const MatchUsersContainer = styled.div`
    margin-top: 40px;
`

const SpanTec = styled.span`
  margin: 5px;
`

const Paragraph = styled.p`
  display: flex;
  justify-content: space-around;
  background: ${THEME.secondary};
  margin-bottom: 10px;
`

const EachRelatedProject = styled(EachUser)`
    img{
        width: 100% !important;
    }
`

export default RelatedUsersPerProject;