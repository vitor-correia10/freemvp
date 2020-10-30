import React from "react";
import styled from "styled-components/macro";
import { THEME } from "../style/Theme";

export const Image = ({ itemSrc }) => {
    return (
        <Wrapper>
            <ItemImage src={itemSrc} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  padding: 70px 0;

  @media (min-width: ${THEME.mobile}) {
    width: 50%;
    padding: 40px 0;
  }
`;

const ItemImage = styled.img`
  min-width: 200px;
  width: 70%;
  height: auto;
`;

export default Image;
