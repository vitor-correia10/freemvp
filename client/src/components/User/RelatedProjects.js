import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { THEME } from "../style/Theme";
import EachProject from "../Project/EachProject";


const RelatedProjects = () => {
    const relatedProjects = useSelector((state) => state.RelatedProjects);

    let relatedProjectsArray = Object.keys(relatedProjects).map(function (k) { return relatedProjects[k] });

    return (
        <Wrapper>
            <Row>
                {
                    relatedProjectsArray.map((project, index) =>
                        <>
                            <EachRelatedProject key={`${project._id}`} project={project}>
                                <Paragraph>
                                    {Object.keys(project.technologies).map((technology) =>
                                        <SpanTec>{technology}</SpanTec>
                                    )
                                    }
                                </Paragraph>
                            </EachRelatedProject>
                        </>
                    )
                }
            </Row>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: block;

  @media (min-width: ${THEME.mobile}) {
    display: flex;
    flex-direction: row;
    margin: 0 40px 40px 40px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;  

  @media (min-width: ${THEME.mobile}) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const SpanTec = styled.span`
  margin: 5px;
`

const Paragraph = styled.p`
  display: flex;
  justify-content: space-around;
  background: ${THEME.primary};
  margin-bottom: 10px;
`

const EachRelatedProject = styled(EachProject)`
    img{
        width: 100% !important;
    }
`

export default RelatedProjects;