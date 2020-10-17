import React from "react";
import styled from "styled-components/macro";
import { FaTwitterSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { THEME } from "./style/Theme";

const socialIconDim = { height: "25px", width: "25px" };

const Footer = () => {
  return (
    <FooterContainer>
      <ShopQCard>
        <BioContainer>
          <Bio>
            {/* Lorem ipsum dolor sit amet, vel an decore denique assentior, mei no
            inimicus adversarium. Vel duis reprimique in. Mei option
            consectetuer in, exerci recusabo oportere vim eu. Ea vivendo
            adipiscing efficiantur qui. Has cu posse harum impedit. */}
            <HandsIcon /> Kindness generates kindness <HandsIcon />
          </Bio>
        </BioContainer>
        <SocialBar>
          <StyledTwitter />
          <StyledFacebook />
          <StyledLinkedin />
          <StyledYoutube />
          <StyledInstagram />
        </SocialBar>
      </ShopQCard>
      <TabCard>
        <TabColumn>
          <TabHeader>INFORMATION</TabHeader>
          <TabLink>About</TabLink>
          <TabLink>Terms of Service</TabLink>
          <TabLink>Privacy Policy</TabLink>
          <TabLink>Donations</TabLink>
        </TabColumn>
        <TabColumn>
          <TabHeader>CONTACT</TabHeader>
          <AnchorEmail href="mailto:info@freeMVP.com">info@freeMVP.com</AnchorEmail>
          <TabLink>Call us: 1 (800) 324 - FREE</TabLink>
        </TabColumn>
      </TabCard>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: block;
  padding: 30px;

  @media (min-width: ${THEME.mobile}) {
    display: flex;
    align-items: center;
  }
`;

const ShopQCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 50px;
`;

const TabCard = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`;

const BioContainer = styled.div`
  display: flex;
`;

const Bio = styled.h4`
  line-height: 1.5em;
  font-weight: 400;
  margin-bottom: 30px;
  font-size: 1.2em;

  @media (max-width: ${THEME.mobile}) {
    font-size: 1rem;
  }
`;
const SocialBar = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;

  @media (max-width: ${THEME.mobile}) {
    padding-bottom: 25px;
    width: 75%;
    justify-content: space-between;
  }
`;

const TabColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 20px;

  @media (max-width: ${THEME.mobile}) {
    padding-right: 20px;
  }
`;

const TabHeader = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2em;
`;
const TabLink = styled.div`
  display: block;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 1.5em;
`;

const AnchorEmail = styled.a`
  display: block;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 1.5em;
`

const StyledTwitter = styled(FaTwitterSquare)`
  width: ${socialIconDim.width};
  height: ${socialIconDim.height};

  &:hover {
    cursor: pointer;
  }
`;

const StyledFacebook = styled(FaFacebookSquare)`
  width: ${socialIconDim.width};
  height: ${socialIconDim.height};

  &:hover {
    cursor: pointer;
  }
`;

const StyledLinkedin = styled(FaLinkedin)`
  width: ${socialIconDim.width};
  height: ${socialIconDim.height};

  &:hover {
    cursor: pointer;
  }
`;

const StyledYoutube = styled(FaYoutube)`
  width: ${socialIconDim.width};
  height: ${socialIconDim.height};

  &:hover {
    cursor: pointer;
  }
`;

const StyledInstagram = styled(FaInstagramSquare)`
  width: ${socialIconDim.width};
  height: ${socialIconDim.height};

  &:hover {
    cursor: pointer;
  }
`;

const HandsIcon = styled(FaHandsHelping)`
  width: ${socialIconDim.width};
  height: ${socialIconDim.height};
`
