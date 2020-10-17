import React from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../Actions";
import { THEME } from "../style/Theme";
import { FormLabel } from '../Labels';

const LoginModal = ({ onClick }) => {

  const dispatch = useDispatch();

  return (
    <ModalWrapper onClick={(event) => dispatch(toggleModal())}>
      <Modal
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ModalHeader>
          <IconBtn
            onClick={(event) => {
              event.stopPropagation();
              dispatch(toggleModal());
            }}
          >
            <AiFillCloseCircle />
          </IconBtn>
        </ModalHeader>
        <FormSection>
          <FormLabel>
            Email
          </FormLabel>
          <Input type="email"
            name="email" />
        </FormSection>
        <FormSection>
          <FormLabel>
            Password
          </FormLabel>
          <Input type="password"
            name="password" />
        </FormSection>
        <button>
          Login
        </button>
      </Modal>
    </ModalWrapper>
  );
};

const IconBtn = styled.a`
  border: none;
  background-color: transparent;
  text-decoration: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #aaa;
  background-color: rgba(50, 50, 50, 0.5);
  cursor: pointer;
  z-index: 999;
`;

const Modal = styled.div`
  width: 50vw;
  min-width: 300px;
  max-height: 70vh;
  overflow: auto;
  margin: 0 auto;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  cursor: default;

  @media (max-width: ${THEME.mobile}) {
    width: 50%;
    min-width: 250px;
    padding: 10px;
  }
`;

const FormSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
`

const Input = styled.input`
    height: 30px;
    width: 50%;
    min-width: 200px;
`

export default LoginModal;
