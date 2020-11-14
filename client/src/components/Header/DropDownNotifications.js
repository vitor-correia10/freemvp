import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { updateProject, updateWorkingDevelopers } from '../../Actions';

const IconDim = { height: "25px", width: "25px" };

const DropDownNotifications = ({ notifications }) => {
    const dispatch = useDispatch();

    const project = useSelector((state) => state.Project);
    const pendingDevelopers = useSelector((state) => state.Project.pendingDevelopers);
    const workingDevelopers = useSelector((state) => state.WorkingDevelopers);
    const [addWorkingDevelopers, setAddWorkingDevelopers] = React.useState(workingDevelopers);
    const [updatePendingDevelopers, setUpdatePendingDevelopers] = React.useState(pendingDevelopers);


    const rejectAction = (rejectDeveloper, projectName) => {
        fetch('http://localhost:8080/rejectuser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: rejectDeveloper,
                name: projectName,
            }),
        })
            .then(res => res.json())
            .then((responseBody) => {
                const { status, projectData } = responseBody;
                if (status === 'success') {
                    setUpdatePendingDevelopers(projectData.pendingDevelopers);
                    dispatch(updateProject(projectData.pendingDevelopers, 'pendingDevelopers'));
                } else {
                    console.log('Error')
                }
            })
    }

    const approveAction = (approveDeveloper, projectName) => {
        fetch('http://localhost:8080/approveuser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: approveDeveloper,
                name: projectName,
            }),
        })
            .then(res => res.json())
            .then((responseBody) => {
                const { status, projectData, workingDevelopersData } = responseBody;
                if (status === 'success') {
                    const obj = Object.assign({}, workingDevelopersData);

                    setAddWorkingDevelopers(obj);
                    dispatch(updateWorkingDevelopers(obj));

                    setUpdatePendingDevelopers(projectData.pendingDevelopers);
                    dispatch(updateProject(projectData.pendingDevelopers, 'pendingDevelopers'));
                } else {
                    console.log('Error')
                }
            })
    }

    return (
        <>
            {notifications.length ?
                <>
                    < h4 > DEVELOPERS</h4>
                    {
                        notifications.map((developer, index) =>
                            <DropdownItem key={`${developer._id}`} developer={developer}>
                                <Anchor href={"/user/" + developer.email}>
                                    {developer.firstName}
                                </Anchor>

                                <ActionsDiv>
                                    <ActionAnchor onClick={() => {
                                        rejectAction(developer.email, project.name);
                                    }}>
                                        <Reject />
                                    </ActionAnchor>
                                    <ActionAnchor onClick={() => {
                                        approveAction(developer.email, project.name);
                                    }}>
                                        <Approve />
                                    </ActionAnchor>
                                </ActionsDiv>
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
       background: ${THEME.secondary};
    }
`

const NotificationP = styled.p`
    text-align: center;
    margin: 22px;
    font-size: 18px;
    padding: 5px 10px;
    color: white;
    font-style: italic;
`

const ActionsDiv = styled.div`

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

export default DropDownNotifications;