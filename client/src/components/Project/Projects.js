import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from "../style/Theme";
import EachProject from "./EachProject";
import Loading from "../style/Loading"

const Projects = () => {
  const [projects, setProjects] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const fetchProjects = async () => {
    const response = await fetch(`http://localhost:8080/projects`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((responseBody) => {
        const { status, data } = responseBody;
        if (status === 'success') {
          setProjects(data);
          setLoading(false);
        } else {
          console.log('Error');
        }
      })
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Row>
        {
          projects.map((project, index) =>
            <EachProject key={`${project._id}`} project={project}>
              <Paragraph>
                {Object.keys(project.technologies).map((technology) =>
                  <SpanTec key={technology}>{technology}</SpanTec>
                )
                }
              </Paragraph>
            </EachProject>
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
  width: 100%;

  @media (min-width: ${THEME.mobile}) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
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
export default Projects;