import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';
import { useForm } from "react-hook-form";

//Redux
import { addProject } from '../../Actions';
import { useSelector, useDispatch } from "react-redux";

//Components
import { ErrorMessage } from '../ErrorMessage';
import { FormLabel } from '../Labels';
import { MainHeader } from '../style/Headings';
import { FormSubmitButton } from '../Buttons';

const FormProject = () => {
    const { register, errors, handleSubmit } = useForm();
    const firstName = useSelector((state) => state.Developer.firstName);
    const lastName = useSelector((state) => state.Developer.lastName);
    const image = useSelector((state) => state.Developer.image);
    const email = useSelector((state) => state.Developer.email);
    const technologies = useSelector((state) => state.Developer.technologies);
    const about = useSelector((state) => state.Developer.about);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch((data.firstName, data.lastName, data.image, data.email, data.technologies, data.about))
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)} action="/project" method="post">
                <MainHeader>Send Your Project</MainHeader>

                <FormSection>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" ref={register({ required: true })} />
                    {errors.name && <ErrorMessage>Name is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Project Image</FormLabel>
                    <Input type="file"
                        valur="image"
                        name="image"
                        accept="image/*"
                        ref={register({ required: false })}
                    />
                </FormSection>

                <FormSection>
                    <FormLabel>Phone</FormLabel>
                    <Input name="email" type="number" ref={register({ required: true, maxLength: 10 })} />
                    {errors.email && <ErrorMessage>Phone is required.</ErrorMessage>}
                    {errors.about && errors.about.type === "maxLength" && <ErrorMessage>This field required max length of 10 numbers.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Country</FormLabel>
                    <SelectOptions name="country">
                        <option value="CA" seleted>Canada</option>
                        <option value="US">United States</option>
                    </SelectOptions>
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
                    <FormLabel>Which technologies would you like?</FormLabel>
                    <div>
                        <InputCheckbox type="checkbox" name="technologies" value="Javascript" ref={register({ required: false })} />Javascript
                        <InputCheckbox type="checkbox" name="technologies" value="React" ref={register({ required: false })} />React
                        <InputCheckbox type="checkbox" name="technologies" value="Node" ref={register({ required: false })} />Node
                        <InputCheckbox type="checkbox" name="technologies" value="Mongo" ref={register({ required: false })} />Mongo
                    </div>
                </FormSection>

                <FormSection>
                    <FormLabel >About your project</FormLabel>
                    <TextArea name="about" ref={register({ required: true, minLength: 5 })} />
                    {errors.about && errors.about.type === "required" && <ErrorMessage>"About your project" is required.</ErrorMessage>}
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

const SelectOptions = styled.select`
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

export default FormProject;