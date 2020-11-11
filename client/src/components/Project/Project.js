import React from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory } from "react-router-dom";
import { THEME } from "../style/Theme";
import Image from "./Image";
import { FormSubmitButton } from '../style/Buttons';
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from '../../Actions';

const Project = () => {
  const { name } = useParams();
  const [project, setProject] = React.useState({});
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const loggedUserId = useSelector((state) => state.LoggedUser._id);
  const loggedUserEmail = useSelector((state) => state.LoggedUser.email);
  const loggedUserappliedToProjects = useSelector((state) => state.LoggedUser.appliedToProjects);
  const [appliedToProjects, setAppliedToProjects] = React.useState(loggedUserappliedToProjects);

  const fetchProject = async () => {
    const response = await fetch(`http://localhost:8080/project/${name}`, {
      method: 'GET',
      name
    })
      .then(res => res.json())
      .then((responseBody) => {
        const { status, projectData, userData } = responseBody;
        if (status === 'success') {
          setProject(projectData);
          setUser(userData);
          setLoading(false);
        } else {
          console.log('Error');
        }
      })
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const viewProject = (name) => {
    history.push("/project/" + name);
  };

  const matchProject = (name, email) => {
    fetch('http://localhost:8080/matchproject', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then(res => res.json())
      .then((responseBody) => {
        const { status, userData } = responseBody;
        if (status === 'success') {
          setAppliedToProjects(...appliedToProjects, userData.appliedToProjects);
          dispatch(updateUser(userData.appliedToProjects, 'appliedToProjects'))
        } else {
          console.log('Error')
        }
      })
  }

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
          <ProjectManager>Project Manager: <a href={"/user/" + user.email}>{user.firstName} {user.lastName}</a></ProjectManager>
        </AlignBox>
        <Paragraph>{project.description}</Paragraph>
        <TecParagraph>
          {Object.keys(project.technologies).map((technology) =>
            <SpanTec key={technology}>{technology}</SpanTec>
          )
          }
        </TecParagraph>
        <div>
          {project.developers.length ?
            <Developer>  Display developers  </Developer>
            : ''
          }
        </div>


        {loggedUserId === project.admin ?
          <OwnProjectP>
            Your project
            </OwnProjectP>
          : appliedToProjects.includes(project._id) ?
            <OwnProjectP>
              Pending request
              </OwnProjectP>
            : <SubmitButtonDiv>
              <ApplyButton onClick={() => {
                matchProject(project.name, loggedUserEmail);
              }}>Apply</ApplyButton>
            </SubmitButtonDiv>
        }
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

const OwnProjectP = styled.p`
  text-align: center;
  margin: 22px;
  font-size: 18px;
  padding: 5px 10px;
  color: gray;
  font-style: italic;
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