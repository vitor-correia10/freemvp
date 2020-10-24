import styled from 'styled-components/macro';

export const FormSubmitButton = styled.button`
    margin: 20px;
    font-size: 18px;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    border: 2px black solid;

    &:hover {
    transform: scale(1.05);
    transition: 0.4s ease-out;
    box-shadow: 0px 0px 3px 2px rgba(23,43,43,0.3);
    }
`