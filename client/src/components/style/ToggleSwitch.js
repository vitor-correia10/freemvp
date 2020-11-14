import React from "react";
import styled from "styled-components/macro";
import { THEME } from "../style/Theme";

const ToggleSwitch = () => {
    return (

        <Switch>
            <Input type="checkbox" />
            <Slider />
        </Switch>

    );
};

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 35px;
`

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: gray;

    &:before{
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background: red;
    }
`

export default ToggleSwitch;
