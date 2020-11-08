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
    width: 30%;
    padding: 40px 0;
  }
`;

const ItemImage = styled.img`
  width: 150px;
  border-radius: 50%;
  height: 150px;
`;

export default Image;
