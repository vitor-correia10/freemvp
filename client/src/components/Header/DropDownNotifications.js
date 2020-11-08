import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';
import { useSelector } from 'react-redux';


const DropDownNotifications = ({ notifications }) => {
    const userProfile = useSelector((state) => state.LoggedUser);
    const pendingDevelopersIds = useSelector((state) => state.Project.pendingDevelopers);
    // const [loading, setLoading] = React.useState(true);

    return (
        <>
            <DropdownMenu>
                Project Applications
                {notifications.length > 0 ?
                    notifications.map((notification, index) =>
                        <DropdownItem key={`${notification._id}`} notification={notification}>
                            <Anchor href={"/user/" + notification.email}>
                                {notification.firstName}
                            </Anchor>

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
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    transition: background 300ms;
    padding: 0.5rem;
    justify-content: center;
    color: white;

    &:hover{
        background: ${THEME.primary};
    }
`

const Anchor = styled.a`
    color: white;
    text-decoration: none;
`

const NotificationP = styled.p`
    text-align: center;
    margin: 22px;
    font-size: 18px;
    padding: 5px 10px;
    color: white;
    font-style: italic;
`

export default DropDownNotifications;