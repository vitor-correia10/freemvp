import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';
import { useForm } from "react-hook-form";

//Redux
import { addUser, addTechnologies } from '../../Actions';
import { useSelector, useDispatch } from "react-redux";

//Components
import { ErrorMessage } from '../style/ErrorMessage';
import { FormLabel } from '../Labels';
import { MainHeader } from '../style/Headings';
import { FormSubmitButton } from '../style/Buttons';
import { useHistory } from 'react-router-dom';

const FormUser = () => {
    const { register, errors, handleSubmit } = useForm();
    const firstName = useSelector((state) => state.User.firstName);
    const lastName = useSelector((state) => state.User.lastName);
    const image = useSelector((state) => state.User.image);
    const email = useSelector((state) => state.User.email);
    const password = useSelector((state) => state.User.password);
    const technologies = useSelector((state) => state.User.technologies);
    const about = useSelector((state) => state.User.about);
    const isLogin = useSelector((state) => state.login.isLogin);
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

        fetch('http://localhost:8080/form-project-2', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then((responseBody) => {
                const { status } = responseBody;
                if (status === 'success') {
                    history.push("/form-project-2");
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

                <MainHeader>User Profile</MainHeader>

                <FormSection>
                    <FormLabel>First Name*</FormLabel>
                    <Input
                        type="text"
                        name="firstName"
                        onChange={(event) => {
                            dispatch(addUser(event.target.value, 'firstName'));
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
                            dispatch(addUser(event.target.value, 'lastName'));
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
                            dispatch(addUser(event.target.files[0], 'image'));
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
                            dispatch(addUser(event.target.value, 'email'));
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
                            dispatch(addUser(event.target.value, 'password'));
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
                                dispatch(addTechnologies(event.target.value, 'technologies'));
                            }}
                            value="Javascript" ref={register({ required: false })} />Javascript
                        <InputCheckbox type="checkbox" name="technologies"
                            onChange={(event) => {
                                dispatch(addTechnologies(event.target.value, 'technologies'));
                            }}
                            value="React" ref={register({ required: false })} />React
                        <InputCheckbox type="checkbox" name="technologies"
                            onChange={(event) => {
                                dispatch(addTechnologies(event.target.value, 'technologies'));
                            }}
                            value="Node" ref={register({ required: false })} />Node
                        <InputCheckbox type="checkbox" name="technologies"
                            onChange={(event) => {
                                dispatch(addTechnologies(event.target.value, 'technologies'));
                            }}
                            value="Mongo" ref={register({ required: false })} />Mongo
                    </div>
                </FormSection>

                <FormSection>
                    <FormLabel >About you</FormLabel>
                    <TextArea name="about"
                        onChange={(event) => {
                            dispatch(addUser(event.target.value, 'about'));
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
                    Next
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
    background: ${THEME.primary};
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