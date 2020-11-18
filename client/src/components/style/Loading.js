import React from 'react';
import { GiSpinalCoil } from "react-icons/gi";
import styled from 'styled-components/macro';

const Loading = () => {
    return (
        <Wrapper>
            <GiSpinalCoil />
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  animation: spin 2s infinite linear;
  height: 100vh;

  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}
`

export default Loading;
