import React from 'react';
import styled from 'styled-components/macro';
import { useParams } from "react-router-dom";
import { THEME } from "../style/Theme";
import Image from "./Image";
import { FormSubmitButton } from '../style/Buttons';
import { useSelector } from "react-redux";

const Project = () => {
  const { name } = useParams();
  const [project, setProject] = React.useState({});
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const loggedUserId = useSelector((state) => state.LoggedUser._id);

  const fetchProject = async () => {
    const response = await fetch(`http://localhost:8080/project/${name}`, {
      method: 'GET',
      name
    })
      .then(res => res.json())
      .then((responseBody) => {
        const { status, projectData, userData } = responseBody;
        if (status === 'success') {
          console.log('projectData', projectData);
          setProject(projectData);
          setUser(userData);
          setLoading(false);
        } else {
          console.log('Error');
        }
      })
  };

  React.useEffect(() => {
    fetchProject();
  }, []);
  if (loading) {
    return loading;
  }

  return (
    <Wrapper>
      <Image itemSrc={"/uploads/" + project.image} />
      <ProductDetails>
        <AlignBox>
          <h1>{project.name}</h1>
          <ProjectManager>Project Manager: {user.firstName} {user.lastName}</ProjectManager>
        </AlignBox>
        <Paragraph>{project.description}</Paragraph>
        <TecParagraph>
          {Object.keys(project.technologies).map((technology) =>
            <SpanTec key={technology}>{technology}</SpanTec>
          )
          }
        </TecParagraph>
        {project.developers ?
          <Developer>  Display developers  </Developer>
          : loggedUserId === project.admin ? ""
            : <ApplyButton>Apply</ApplyButton>}
      </ProductDetails>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: block;

  @media (min-width: ${THEME.mobile}) {
                    display: flex;
    margin: 0 40px 40px 40px;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  margin: 40px 0;

  @media (max-width: ${THEME.mobile}) {
    margin-top: 10px;
    padding: 0 20px;
  }
`;

const Paragraph = styled.p`
  font-size: 16px;

  @media (max-width: ${THEME.mobile}) {
    margin-top: 10px;
  }
`;

const AlignBox = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ProjectManager = styled.p`
    font-size: 14px;
`

const Developer = styled.p`
`

const TecParagraph = styled.p`
  display: flex;
  justify-content: space-around;
  background: ${THEME.primary};
  margin: 10px 0;
`

const SpanTec = styled.span`
  margin: 5px;
`

const ApplyButton = styled(FormSubmitButton)`
  width: 30%;
  min-width: 200px;
`

const SubmitButtonDiv = styled.div`
  text-align: center;
`

export default Project;