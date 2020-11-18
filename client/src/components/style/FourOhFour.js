import React from "react";
import styled from "styled-components/macro";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
import { THEME } from "./Theme";
import crySrc from '../../assets/cry.jpg';

const FourOhFour = () => {
    return (
        <>
            <PageContainer>
                <Image src={crySrc} alt="404 Image" />
                <ErrorTitle>
                    <BiError /> Sorry, page not found <BiError />
                </ErrorTitle>
                <ErrorSubtitle>
                    Click <StyledLink to="/">here</StyledLink> to return home.
          </ErrorSubtitle>
            </PageContainer>
        </>
    );
};

export default FourOhFour;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fffefc;
  height: 85vh;
  width: 100vw;
  background: black;
`;

const Image = styled.img`
    width: 30%;
`

const ErrorTitle = styled.h1`
  color: ${THEME.primary};
  display: flex;
  align-items: center;
`;

const ErrorSubtitle = styled.h3`
  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${THEME.primary};
`;
