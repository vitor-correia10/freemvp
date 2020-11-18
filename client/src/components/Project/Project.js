import React from 'react';
import styled from 'styled-components/macro';
import { useParams } from "react-router-dom";
import { THEME } from "../style/Theme";
import Image from "./Image";
import { FormSubmitButton } from '../style/Buttons';
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from '../../Actions';
import WorkingDevelopersNotLogged from './WorkingDevelopersNotLogged';
import { AiFillCheckCircle } from "react-icons/ai";
import Loading from '../style/Loading'

const checkedIcon = { height: "20px", width: "20px" };

const Project = () => {
  const { name } = useParams();
  const [project, setProject] = React.useState({});
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const loggedUserId = useSelector((state) => state.LoggedUser._id);
  const loggedUserEmail = useSelector((state) => state.LoggedUser.email);
  const loggedUserappliedToProjects = useSelector((state) => state.LoggedUser.appliedToProjects);
  const [appliedToProjects, setAppliedToProjects] = React.useState(loggedUserappliedToProjects);
  const loggedWorkingProjects = useSelector((state) => state.LoggedUser.workingProjects);
  const [workingDevelopers, setWorkingDevelopers] = React.useState([]);

  const fetchProject = async () => {
    const response = await fetch(`http://localhost:8080/project/${name}`, {
      method: 'GET',
      name
    })
      .then(res => res.json())
      .then((responseBody) => {
        const { status, projectData, userData, workingDevelopersData } = responseBody;
        if (status === 'success') {
          setProject(projectData);
          setUser(userData);
          setLoading(false);
          setWorkingDevelopers(workingDevelopersData);
        } else {
          console.log('Error');
        }
      })
  };

  const dispatch = useDispatch();

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
    return <Loading />;
  }

  return (
    <>
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
            )}
          </TecParagraph>

          {
            loggedUserId.length < 1 ?
              ''
              : loggedUserId === project.admin ?
                <OwnProjectP>
                  Your project
            </OwnProjectP>
                : loggedWorkingProjects.includes(project._id) ?
                  <OwnProjectP>
                    Working project
              </OwnProjectP>
                  : project.isCompleted ?
                    <OwnProjectP>
                      <StyledChecked /> Completed
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
      <div>
        {project.workingDevelopers.length ?
          <>
            <WorkingDevelopersNotLogged workingDevelopersArray={workingDevelopers} />
          </>
          : ''
        }
      </div>
    </>
  )
}

const Wrapper = styled.div`
  display: block;

  @media (min-width: ${THEME.mobile}) {
          display: flex;
    margin: 30px 20px;
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
    width: 100%;
    align-items: center;
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
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;

  @media (min-width: ${THEME.mobile}) {
    align-items: end;
    margin-bottom: 20px;
  }
`;

const ProjectManager = styled.p`
    font-size: 14px;
`

const OwnProjectP = styled.p`
  margin: 22px;
  font-size: 18px;
  padding: 5px 10px;
  color: gray;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TecParagraph = styled.p`
  display: flex;
  justify-content: space-around;
  background: ${THEME.primary};
  margin: 10px 0;
  width: 100%;
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

const StyledChecked = styled(AiFillCheckCircle)`
  width: ${checkedIcon.width};
  height: ${checkedIcon.height};
  margin-right: 5px;
`;

export default Project;