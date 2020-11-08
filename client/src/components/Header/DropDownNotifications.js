import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';
import { useSelector } from 'react-redux';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const IconDim = { height: "25px", width: "25px" };

const DropDownNotifications = ({ notifications }) => {
    const userProfile = useSelector((state) => state.LoggedUser);
    const pendingDevelopersIds = useSelector((state) => state.Project.pendingDevelopers);

    const rejectAction = (rejectDeveloper) => {
        console.log('here')

    }

    const approveAction = (approveDeveloper) => {
        console.log('hellow!')

    }

    return (
        <>
            <DropdownMenu>
                DEVELOPERS
                {notifications.length > 0 ?
                    notifications.map((notification, index) =>
                        <DropdownItem key={`${notification._id}`} notification={notification}>
                            <Anchor href={"/user/" + notification.email}>
                                {notification.firstName}
                            </Anchor>

                            <ActionsDiv>
                                <ActionAnchor onClick={() => {
                                    rejectAction(notification.email);
                                }}>
                                    <Reject />
                                </ActionAnchor>
                                <ActionAnchor onClick={() => {
                                    approveAction(notification.email);
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