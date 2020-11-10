import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { updateProject } from '../../Actions';

const IconDim = { height: "25px", width: "25px" };

const DropDownNotifications = ({ notifications }) => {
    const dispatch = useDispatch();

    const project = useSelector((state) => state.Project);
    const pendingDevelopers = useSelector((state) => state.Project.pendingDevelopers);
    const approvedDevelopers = useSelector((state) => state.Project.developers);
    const [addApprovedDevelopers, setAddApprovedDevelopers] = React.useState(approvedDevelopers);
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
                    setUpdatePendingDevelopers(...updatePendingDevelopers, projectData.updatePendingDevelopers);
                    dispatch(updateProject(projectData.updatePendingDevelopers, 'pendingDevelopers'));
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
                const { status, projectData } = responseBody;
                if (status === 'success') {
                    setAddApprovedDevelopers(projectData.developers);
                    dispatch(updateProject(projectData.developers, 'developers'));

                    setUpdatePendingDevelopers(projectData.pendingDevelopers);
                    dispatch(updateProject(projectData.pendingDevelopers, 'pendingDevelopers'));
                } else {
                    console.log('Error')
                }
            })
    }

    return (
        <>
            <DropdownMenu>
                DEVELOPERS
                {notifications.length > 0 ?
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
                    :
                    <NotificationP>
                        0 Notifications
                    </NotificationP>
                }
            </DropdownMenu>

        </>
    )
}

const DropdownMenu = styled.div`
    position: absolute;
    top: 70px;
    width: 250px;
    transform: translateX(-28%);
    background: ${THEME.black};
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px 15px;
    overflow: hidden;
    color: white;
`

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