import styled from 'styled-components/macro';

export const ErrorMessage = styled.p`
    color: #6D071A;
    font-size: 14px;
    margin-bottom: 5px;

    &:before {
    content: "⚠ ";
  }
`