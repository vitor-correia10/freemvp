import React from 'react';
import styled from 'styled-components/macro';
import { useParams } from "react-router-dom";
import Image from "./Image";
import { BiCheck } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { FormSubmitButton } from '../style/Buttons';
import { THEME } from "../style/Theme";
import { updateProject } from '../../Actions';

const NotLoggedProfile = () => {
    const dispatch = useDispatch();
    const { email } = useParams();
    const loggedProject = useSelector((state) => state.Project);
    const currentUser = useSelector((state) => state.LoggedUser);
    const workingDevelopers = useSelector((state) => state.WorkingDevelopers);
    const [project, setProject] = React.useState({});
    const [user, setUser] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const projectAppliedToDevelopers = useSelector((state) => state.Project.appliedToDevelopers);

    let workingDevelopersArray = Object.keys(workingDevelopers).map(function (k) { return workingDevelopers[k] });

    let workingDevelopersArrayById = [];
    workingDevelopersArray.map(value => workingDevelopersArrayById.push(value._id));

    const fetchUser = async () => {
        const response = await fetch(`http://localhost:8080/user/${email}`, {
            method: 'GET',
            email
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

    const matchUser = (name, email) => {
        fetch('http://localhost:8080/matchuser', {
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
                const { status, projectData } = responseBody;
                if (status === 'success') {
                    dispatch(updateProject(projectData.appliedToDevelopers, 'appliedToDevelopers'));
                } else {
                    console.log('Error')
                }
            })
    }

    React.useEffect(() => {
        fetchUser();
    }, []);
    if (loading) {
        return loading;
    }
    return (
        <Wrapper>
            <Image itemSrc={"/uploads/" + user.image} />
            <ProductDetails>
                <AlignBox>
                    <h1>{user.firstName} {user.lastName}</h1>
                </AlignBox>
                <Paragraph>{user.about}</Paragraph>
                <TecParagraph>
                    {Object.keys(user.technologies).map((technology) =>
                        <SpanTec key={technology}><BiCheck /> {technology}</SpanTec>
                    )
                    }
                </TecParagraph>
                {currentUser.email === user.email || workingDevelopersArrayById.includes(user._id) || loggedProject.name.length < 1 ?
                    ''
                    :
                    projectAppliedToDevelopers.includes(user._id) || loggedProject.pendingDevelopers.includes(user._id) ?
                        <OwnProjectP>
                            Pending request
                    </OwnProjectP>
                        :
                        <SubmitButtonDiv>
                            <ApplyButton onClick={() => {
                                matchUser(loggedProject.name, user.email);
                            }}>
                                Match
                        </ApplyButton>

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
      width: 70%;
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
        text-align: center;
      }
    `;

const AlignBox = styled.div`
      display: flex;
      align-items: end;
      flex-direction: column;
      margin-bottom: 20px;
    `;

const TecParagraph = styled.p`
      display: flex;
      justify-content: space-around;
      background: ${THEME.secondary};
      margin: 10px 0;
      width: 100%;
    `

const SpanTec = styled.span`
      margin: 5px;
      display: flex;
      align-items: center;
    `

const ApplyButton = styled(FormSubmitButton)`
      width: 30%;
      min-width: 200px;
    `

const SubmitButtonDiv = styled.div`
      text-align: center;
`

const OwnProjectP = styled.p`
    text-align: center;
    margin: 22px;
    font-size: 18px;
    padding: 5px 10px;
    color: gray;
    font-style: italic;
`

export default NotLoggedProfile;