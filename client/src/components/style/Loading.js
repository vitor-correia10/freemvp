import React from 'react';
import { GiSpinalCoil } from "react-icons/gi";
import styled from 'styled-components/macro';

const Loading = () => {
    return (
        <Wrapper>
            <StyledLoading />
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  height: 50vh;
`

const StyledLoading = styled(GiSpinalCoil)`
    animation: spin 2s infinite linear;

    @keyframes spin {
      from {transform:rotate(0deg);}
      to {transform:rotate(360deg);}
    }
`;

export default Loading;
