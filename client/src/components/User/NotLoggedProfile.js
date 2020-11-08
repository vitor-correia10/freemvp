import React from 'react';
import styled from 'styled-components/macro';
import { useParams } from "react-router-dom";
import Image from "./Image";
import { BiCheck } from "react-icons/bi";

import { FormSubmitButton } from '../style/Buttons';
import { THEME } from "../style/Theme";


const NotLoggedProfile = () => {
    const { email } = useParams();
    const [project, setProject] = React.useState({});
    const [user, setUser] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const fetchUser = async () => {
        const response = await fetch(`http://localhost:8080/user/${email}`, {
            method: 'GET',
            email
        })
            .then(res => res.json())
            .then((responseBody) => {
                console.log('try  email', email)
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
                <SubmitButtonDiv>
                    <ApplyButton>Match</ApplyButton>

                </SubmitButtonDiv>
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

const TecParagraph = styled.p`
      display: flex;
      justify-content: space-around;
      background: ${THEME.secondary};
      margin: 10px 0;
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

export default NotLoggedProfile;