import React from 'react';
import styled from 'styled-components/macro';
import { useParams } from "react-router-dom";
import { THEME } from "../style/Theme";
import Image from "./Image";
import EachProject from "./EachProject";

const Projects = () => {
  const [projects, setProjects] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  console.log(projects)

  const fetchProjects = async () => {
    const response = await fetch(`http://localhost:8080/projects`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((responseBody) => {
        const { status, data } = responseBody;
        if (status === 'success') {
          console.log(data);
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
    return loading;
  }
  return (
    <Wrapper>
      <Row>
        {
          projects.map((project, index) =>
            <>
              <EachProject key={`${project._id}`} project={project}>
                <Paragraph>
                  {Object.keys(project.technologies).map((technology) =>
                    <SpanTec>{technology}</SpanTec>
                  )
                  }
                </Paragraph>
              </EachProject>
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
  background: ${THEME.secondary};
  margin-bottom: 10px;
`
export default Projects;