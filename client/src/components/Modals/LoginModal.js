import React from "react";
import styled from "styled-components/macro";
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { THEME } from "../style/Theme";
import { FormLabel } from '../Labels';
import { FormSubmitButton } from '../style/Buttons';

import {
  addLoggedInUser,
  addLoggedInProject,
  toggleModal,
  addRelatedProjects,
  addRelatedUsers,
  addWorkingProjects,
  addWorkingDevelopers
} from '../../Actions';

import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '../style/ErrorMessage';

const LoginModal = ({ onClick }) => {
  const { register, errors, handleSubmit } = useForm();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [invalidUser, setInvalidUser] = React.useState(false);
  const [noUser, setNoUser] = React.useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = () => {
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(res => res.json())
      .then((responseBody) => {
        const { status, data } = responseBody;
        if (status === 'success') {
          dispatch(addLoggedInUser(data.findUser));
          dispatch(addLoggedInProject(data.findProject));
          dispatch(addRelatedProjects(data.findRelatedProject));
          dispatch(addWorkingProjects(data.findWorkingProjects));
          dispatch(addWorkingDevelopers(data.findWorkingDevelopers));
          dispatch(addRelatedUsers(data.findRelatedUser));
          history.push(`/user`);
          dispatch(toggleModal());
        } else if (status === 'invalid') {
          setInvalidUser(true);
        } else if (status === 'noUser') {
          setNoUser(true);
        }
        else {
          console.log('Error');
        }
      })
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <LoginHeader>Login </LoginHeader>
          <FormSection>
            <FormLabel>
              Email
            </FormLabel>
            <Input type="email"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              ref={register({ required: true })} />
            {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
          </FormSection>
          <FormSection>
            <FormLabel>
              Password
            </FormLabel>
            <Input type="password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              ref={register({ required: true })} />
            {errors.password && <ErrorMessage>Password is required.</ErrorMessage>}
          </FormSection>
          {invalidUser ?
            <FormSection>
              <ErrorMessage>Invalid data. </ErrorMessage>
            </FormSection>
            : ''}
          {noUser ?
            <FormSection>
              <ErrorMessage>This user does not exist. </ErrorMessage>
            </FormSection>
            : ''}
          <FormSubmitButton type="submit">
            Submit
          </FormSubmitButton>
        </form>
      </Modal>
    </ModalWrapper>
  );
};

const LoginHeader = styled.h2`
  margin-bottom: 15px;
`

const IconBtn = styled.a`
  border: none;
  background-color: transparent;
  text-decoration: none;
  cursor: pointer;
  font-size: 20px;

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
  width: 25vw;
  min-width: 250px;
  max-height: 70vh;
  overflow: auto;
  margin: 0 auto;
  padding: 16px;
  background-color: #fff;
  border-radius: 10px;
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
