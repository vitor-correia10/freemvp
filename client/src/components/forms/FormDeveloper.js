import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';
import { useForm } from "react-hook-form";

//Redux
import { addDeveloper } from '../../Actions';
import { useSelector, useDispatch } from "react-redux";

//Components
import { ErrorMessage } from '../ErrorMessage';
import { FormLabel } from '../Labels';
import { MainHeader } from '../style/Headings';
import { FormSubmitButton } from '../Buttons';

const FormDeveloper = () => {
    const { register, errors, handleSubmit } = useForm();
    const firstName = useSelector((state) => state.Developer.firstName);
    const lastName = useSelector((state) => state.Developer.lastName);
    const image = useSelector((state) => state.Developer.image);
    const email = useSelector((state) => state.Developer.email);
    const technologies = useSelector((state) => state.Developer.technologies);
    const about = useSelector((state) => state.Developer.about);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(addDeveloper(data.firstName, data.lastName, data.image, data.email, data.technologies, data.about))
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)} action="/developer" method="post">
                <MainHeader>Developer</MainHeader>

                <FormSection>
                    <FormLabel>First Name</FormLabel>
                    <Input name="firstName" ref={register({ required: true })} />
                    {errors.firstName && <ErrorMessage>First name is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Last Name</FormLabel>
                    <Input name="lastName" ref={register({ required: true })} />
                    {errors.lastName && <ErrorMessage>Last name is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Profile Image</FormLabel>
                    <Input type="file" name="image" ref={register({ required: false })} />
                </FormSection>

                <FormSection>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="email" ref={register({ required: true })} />
                    {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Password</FormLabel>
                    <Input name="password" type="password" ref={register({ required: true })} />
                    {errors.email && <ErrorMessage>Password is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Technologies</FormLabel>
                    <div>
                        <InputCheckbox type="checkbox" name="technologies" value="Javascript" ref={register({ required: false })} />Javascript
                        <InputCheckbox type="checkbox" name="technologies" value="React" ref={register({ required: false })} />React
                        <InputCheckbox type="checkbox" name="technologies" value="Node" ref={register({ required: false })} />Node
                        <InputCheckbox type="checkbox" name="technologies" value="Mongo" ref={register({ required: false })} />Mongo
                    </div>
                </FormSection>

                <FormSection>
                    <FormLabel >About you</FormLabel>
                    <TextArea name="about" ref={register({ required: true, minLength: 5 })} />
                    {errors.about && errors.about.type === "required" && <ErrorMessage>"About you" is required.</ErrorMessage>}
                    {errors.about && errors.about.type === "minLength" && <ErrorMessage>This field required min length of 5 characters.</ErrorMessage>}
                </FormSection>

                <FormSubmitButton type="submit">
                    Submit
                </FormSubmitButton>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    text-align: center;
    width: 100%;
    position: sticky;
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

export default FormDeveloper;