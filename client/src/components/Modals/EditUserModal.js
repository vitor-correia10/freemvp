import React from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { THEME } from "../style/Theme";
import { FormLabel } from '../Labels';
import { FormSubmitButton } from '../style/Buttons';
import { addLoggedInUser, addUserTechnologies, toggleModal, updateUser } from '../../Actions';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '../style/ErrorMessage';
import useKeydown from '../hooks/use-keydown';

const EditUserModal = ({ onClick }) => {
    const { register, errors, handleSubmit } = useForm();
    const userProfile = useSelector((state) => state.LoggedUser);
    const id = useSelector((state) => state.LoggedUser._id);
    const [firstName, setFirstName] = React.useState(userProfile.firstName);
    const [lastName, setLastName] = React.useState(userProfile.lastName);
    const [email, setEmail] = React.useState(userProfile.email);
    const [image, setImage] = React.useState(userProfile.image);
    const [about, setAbout] = React.useState(userProfile.about);
    const initialTechnologies = ['Node', 'Javascript', 'React', 'Mongo'];

    const [technologies, setTechnologies] = React.useState(userProfile.technologies);

    const dispatch = useDispatch();
    const history = useHistory();
    const [userExist, setUserExist] = React.useState(false);

    const onSubmit = () => {
        const formData = new FormData();

        dispatch(updateUser(firstName, 'firstName'))
        dispatch(updateUser(lastName, 'lastName'))
        dispatch(updateUser(image, 'image'))
        dispatch(updateUser(email, 'email'))
        dispatch(updateUser(about, 'about'))
        dispatch(updateUser(technologies, 'technologies'))

        formData.append("image", image)
        formData.append("firstName", firstName)
        formData.append("lastName", lastName)
        formData.append("email", email)
        formData.append("technologies", JSON.stringify(technologies))
        formData.append("about", about)

        fetch('http://localhost:8080/user/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                firstName,
                lastName,
                image,
                technologies,
                about,
                email,
            }),
        })
            .then(res => res.json())
            .then((responseBody) => {
                const { status } = responseBody;
                if (status === 'success') {
                    // update the state
                    history.push(`/user`);
                    dispatch(toggleModal());
                } else {
                    console.log('Error');
                }
            })
    }

    const handleClose = (event) => dispatch(toggleModal(), event.stopPropagation());
    useKeydown("Escape", handleClose);

    return (
        <ModalWrapper onClick={(event) => dispatch(toggleModal())}>
            <Modal
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <ModalHeader>
                    <IconBtn
                        onClick={handleClose}
                    >
                        <AiFillCloseCircle />
                    </IconBtn>
                </ModalHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <LoginHeader>Edit Profile</LoginHeader>
                    <FormSection>
                        <FormLabel>
                            First Name
                        </FormLabel>
                        <Input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(event) => {
                                setFirstName(event.target.value);
                            }}
                            ref={register({ required: false })} />
                        {errors.firstName && <ErrorMessage>First name is required.</ErrorMessage>}
                    </FormSection>
                    <FormSection>
                        <FormLabel>
                            Last Name
                        </FormLabel>
                        <Input type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(event) => {
                                setLastName(event.target.value);
                            }}
                            ref={register({ required: false })} />
                        {errors.lastName && <ErrorMessage>Last name is required.</ErrorMessage>}
                    </FormSection>
                    <FormSection>
                        <FormLabel>Profile Image</FormLabel>
                        <Input type="file"
                            name="image"
                            accept="image/*"
                            onChange={(event) => {
                                setImage(event.target.files[0]);
                            }}
                            ref={register({ required: false })}
                        />
                    </FormSection>
                    <FormSection>
                        <FormLabel>
                            Email
                        </FormLabel>
                        <Input type="email"
                            name="email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                            ref={register({ required: false })} />
                        {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
                    </FormSection>

                    <FormSection>
                        <FormLabel>Technologies</FormLabel>
                        <div>
                            {initialTechnologies.map((technology) =>
                                <div key={technology}>
                                    <InputCheckbox type="checkbox" name="technologies"

                                        onChange={(event) => {
                                            const newTechnologies = { ...technologies, [technology]: event.target.checked };

                                            setTechnologies(newTechnologies);
                                        }
                                        }
                                        checked={technologies[technology]}
                                        value={technology}
                                        ref={register({ required: false })} />
                                    {technology}
                                </div>
                            )}

                        </div>
                    </FormSection>
                    <FormSection>
                        <FormLabel >About you</FormLabel>
                        <TextArea name="about"
                            value={about}
                            onChange={(event) => {
                                setAbout(event.target.value);
                            }}
                            ref={register({ required: false })} />
                    </FormSection>

                    {userExist ?
                        <FormSection>
                            <ErrorMessage>User Already Exists.</ErrorMessage>
                        </FormSection>
                        : ''}
                    <FormSubmitButton type="submit">
                        Send Changes
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
  width: 40vw;
  min-width: 300px;
  max-height: 80vh;
  overflow: auto;
  margin: 0 auto;
  padding: 16px;
  background-color: #fff;
  border-radius: 10px;
  cursor: default;

  @media (max-width: ${THEME.mobile}) {
    width: 50%;
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

const InputCheckbox = styled.input`
    margin-left: 20px;
`

const TextArea = styled.textarea`
    height: 50px;
    width: 45%;
    min-width: 250px;
    max-width: 500px;
`

export default EditUserModal;
