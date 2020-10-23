import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';
import { useForm } from "react-hook-form";

//Redux
import { addUser, addTechnologies, toggleLogin, toggleModal } from '../../Actions';
import { useSelector, useDispatch } from "react-redux";

//Components
import { ErrorMessage } from '../ErrorMessage';
import { FormLabel } from '../Labels';
import { MainHeader } from '../style/Headings';
import { FormSubmitButton } from '../Buttons';
import { useHistory } from 'react-router-dom';

const FormUser = () => {
    const { register, errors, handleSubmit } = useForm();
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [image, setImage] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [technologies, setTechnologies] = React.useState([]);
    const [about, setAbout] = React.useState("");

    const dispatch = useDispatch();
    const history = useHistory();
    const [userExist, setUserExist] = React.useState(false);
    const onSubmit = (data) => {
        const formData = new FormData();

        formData.append("image", image)
        formData.append("firstName", firstName)
        formData.append("lastName", lastName)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("technologies", JSON.stringify(Object.keys(technologies)))
        formData.append("about", about)

        fetch('http://localhost:8080/user', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then((responseBody) => {
                const { status } = responseBody;
                if (status === 'success') {
                    history.push(`/`);
                    dispatch(toggleModal());
                } else if (status === 'userExist') {
                    setUserExist(true);
                } else {
                    console.log('Error');
                }
            })
    }
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <MainHeader>Developer Profile</MainHeader>

                <FormSection>
                    <FormLabel>First Name*</FormLabel>
                    <Input
                        type="text"
                        name="firstName"
                        onChange={(event) => {
                            setFirstName(event.target.value);
                        }}
                        value={firstName}
                        ref={register({ required: true })} />
                    {errors.firstName && <ErrorMessage>First name is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Last Name*</FormLabel>
                    <Input
                        type="text"
                        name="lastName"
                        onChange={(event) => {
                            setLastName(event.target.value);
                        }}
                        value={lastName}
                        ref={register({ required: true })}
                    />
                    {errors.lastName && <ErrorMessage>Last name is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Profile Image*</FormLabel>
                    <Input type="file"
                        name="image"
                        accept="image/*"
                        onChange={(event) => {
                            setImage(event.target.files[0]);
                        }}
                        ref={register({ required: true })}
                    />
                    {errors.image && <ErrorMessage>Image is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Email*</FormLabel>
                    <Input type="email"
                        name="email"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        value={email}
                        ref={register({ required: true })} />
                    {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Password*</FormLabel>
                    <Input type="password"
                        name="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        value={password}
                        ref={register({ required: true, minLength: 8 })} />
                    {errors.password && errors.password.type === "required" && <ErrorMessage>Password is required.</ErrorMessage>}
                    {errors.password && errors.password.type === "minLength" && <ErrorMessage>This field required min length of 8 characters.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Technologies</FormLabel>
                    <div>
                        <InputCheckbox type="checkbox" name="technologies"
                            onChange={(event) => {
                                setTechnologies([...technologies, "Javascript"])
                            }}
                            value="Javascript" ref={register({ required: false })} />Javascript
                        <InputCheckbox type="checkbox" name="technologies"
                            onChange={(event) => {
                                setTechnologies("React");
                            }}
                            value="React" ref={register({ required: false })} />React
                        <InputCheckbox type="checkbox" name="technologies"
                            onChange={(event) => {
                                setTechnologies(event.target.value);
                            }}
                            value="Node" ref={register({ required: false })} />Node
                        <InputCheckbox type="checkbox" name="technologies"
                            onChange={(event) => {
                                setTechnologies(event.target.value);
                            }}
                            value="Mongo" ref={register({ required: false })} />Mongo
                    </div>
                </FormSection>

                <FormSection>
                    <FormLabel >About you</FormLabel>
                    <TextArea name="about"
                        onChange={(event) => {
                            setAbout(event.target.value);
                        }}
                        value={about}
                        ref={register({ required: false })} />
                </FormSection>

                {userExist ?
                    <FormSection>
                        <ErrorMessage>User Already Exist. </ErrorMessage>
                    </FormSection>
                    : ''}
                <FormSubmitButton type="submit">
                    Submit
                </FormSubmitButton>
            </Form>
        </Wrapper >
    )
}

const Wrapper = styled.div`
    text-align: center;
    width: 100%;
    top: 0;
`

const Form = styled.form`
    width: 60%;
    margin: 15px auto;
    padding: 10px;
    background: ${THEME.secondary};
    border-radius: 20px;
    border: 5px double ${THEME.dark}
`

const FormSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
`

const Input = styled.input`
    height: 25px;
    width: 25%;
    min-width: 200px;
`

const TextArea = styled.textarea`
    height: 50px;
    width: 45%;
    min-width: 250px;
    max-width: 500px;
`

const InputCheckbox = styled.input`
    margin-left: 20px;
`

export default FormUser;