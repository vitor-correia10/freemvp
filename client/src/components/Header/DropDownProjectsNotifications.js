import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { updateUser, updateWorkingProjects } from '../../Actions';

const IconDim = { height: "25px", width: "25px" };

const DropDownProjectsNotifications = ({ notifications }) => {
    const dispatch = useDispatch();

    const loggedUser = useSelector((state) => state.LoggedUser);
    let pendingProjects = useSelector((state) => state.LoggedUser.pendingProjects);
    let workingProjects = useSelector((state) => state.WorkingProjects);

    const rejectAction = (currentDeveloper, projectName) => {
        fetch('http://localhost:8080/rejectproject', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: currentDeveloper,
                name: projectName,
            }),
        })
            .then(res => res.json())
            .then((responseBody) => {
                const { status, userData } = responseBody;
                if (status === 'success') {
                    pendingProjects = userData.pendingProjects;
                    dispatch(updateUser(userData.pendingProjects, 'pendingProjects'));
                } else {
                    console.log('Error')
                }
            })
    }

    const approveAction = (currentDeveloper, projectName) => {
        fetch('http://localhost:8080/approveproject', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: currentDeveloper,
                name: projectName,
            }),
        })
            .then(res => res.json())
            .then((responseBody) => {
                const { status, userData, workingProjectsData } = responseBody;
                if (status === 'success') {
                    const obj = Object.assign({}, workingProjectsData);

                    workingProjects = obj;
                    dispatch(updateWorkingProjects(obj));

                    pendingProjects = userData.pendingProjects;
                    dispatch(updateUser(userData.pendingProjects, 'pendingProjects'));
                } else {
                    console.log('Error')
                }
            })
    }

    return (
        <>
            {notifications.length ?
                <>
                    <h4>PROJECTS</h4>
                    {
                        notifications.map((project, index) =>
                            <DropdownItem key={`${project._id}`} project={project}>
                                <Anchor href={"/project/" + project.name}>
                                    {project.name}
                                </Anchor>

                                <div>
                                    <ActionAnchor onClick={() => {
                                        rejectAction(loggedUser.email, project.name);
                                    }}>
                                        <Reject />
                                    </ActionAnchor>
                                    <ActionAnchor onClick={() => {
                                        approveAction(loggedUser.email, project.name);
                                    }}>
                                        <Approve />
                                    </ActionAnchor>
                                </div>
                            </DropdownItem>
                        )
                    }
                </>
                : ''
            }
        </>
    )
}

const DropdownItem = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
`

const Anchor = styled.a`
    color: white;
    text-decoration: none;
    transition: background 300ms;
    padding: 0.5rem;
    border-radius: 10px;
    width: 175px;

    &:hover{
       background: ${THEME.primary};
    }
`

const Approve = styled(AiOutlineCheckCircle)`
  width: ${IconDim.width};
  height: ${IconDim.height};
  margin: 10px;

  &:hover {
    color: ${THEME.secondary};
    cursor: pointer;
  }
`;

const Reject = styled(AiOutlineCloseCircle)`
  width: ${IconDim.width};
  height: ${IconDim.height};
  margin: 10px;

  &:hover {
    color: ${THEME.primary};
    cursor: pointer;
  }
`;

const ActionAnchor = styled.a`
    text-decoration: none;
`

export default DropDownProjectsNotifications;