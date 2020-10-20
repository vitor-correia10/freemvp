import styled from 'styled-components/macro';

export const ErrorMessage = styled.p`
    color: #8b0000;
    background: rgb(133,133,133,0.8);
    width: auto;
    padding: 5px;
    font-size: 14px;
    margin-bottom: 5px;
    text-align: center;
    margin: 5px auto;

    &:before {
    content: "⚠ ";
  }
`