import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';
import { useForm } from "react-hook-form";

//Redux
import { addProject, addTechnologies, toggleLogin } from '../../Actions';
import { useSelector, useDispatch } from "react-redux";

//Components
import { ErrorMessage } from '../ErrorMessage';
import { FormLabel } from '../Labels';
import { MainHeader } from '../style/Headings';
import { FormSubmitButton } from '../Buttons';
import { useHistory } from 'react-router-dom';

const FormProject = () => {
    const { register, errors, handleSubmit } = useForm();
    const name = useSelector((state) => state.Project.name);
    const image = useSelector((state) => state.Project.image);
    const description = useSelector((state) => state.Project.description);
    const technologies = useSelector((state) => state.Project.technologies);
    const email = useSelector((state) => state.Project.email);
    const password = useSelector((state) => state.Project.password);
    const phone = useSelector((state) => state.Project.phone);
    const country = useSelector((state) => state.Project.country);
    const isLogin = useSelector((state) => state.login.isLogin);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data) => {
        const formData = new FormData();

        formData.append("name", name)
        formData.append("image", image)
        formData.append("description", description)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("password", password)
        formData.append("country", country)
        formData.append("technologies", JSON.stringify(Object.keys(technologies)))

        fetch('http://localhost:8080/project', {
            method: 'POST',
            body: formData,
        })

            .then(res => res.json())
            .then((responseBody) => {
                const { status } = responseBody;
                if (status === 'success') {
                    history.push("/project");
                    let isLogin = true;
                    dispatch(toggleLogin());
                } else {
                    console.log('Error');
                }
            })
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)} action="/project" method="post">
                <MainHeader>Send Your Project</MainHeader>

                <FormSection>
                    <FormLabel>Name</FormLabel>
                    <Input
                        name="name"
                        onChange={(event) => {
                            dispatch(addProject(event.target.value, 'name'));
                        }}
                        value={name}
                        ref={register({ required: true })} />
                    {errors.name && <ErrorMessage>Name is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Project Image</FormLabel>
                    <Input type="file"
                        name="image"
                        accept="image/*"
                        onChange={(event) => {
                            dispatch(addProject(event.target.files[0], 'image'));
                        }}
                        ref={register({ required: true })}
                    />
                    {errors.image && <ErrorMessage>Image is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Phone</FormLabel>
                    <Input
                        name="phone"
                        type="number"
                        onChange={(event) => {
                            dispatch(addProject(event.target.value, 'phone'));
                        }}
                        value={phone}
                        ref={register({ required: false, minLength: 10 })}
                    />
                    {errors.phone && errors.phone.type === "minLength" && <ErrorMessage>This field requires 10 numbers.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Country</FormLabel>
                    <SelectOptions name="country"
                        onChange={(event) => {
                            dispatch(addProject(event.target.value, 'country'));
                        }}
                    >
                        <option value="CA" seleted>Canada</option>
                        <option value="US">United States</option>
                    </SelectOptions>
                </FormSection>


                <FormSection>
                    <FormLabel>Email</FormLabel>
                    <Input type="email"
                        name="email"
                        onChange={(event) => {
                            dispatch(addProject(event.target.value, 'email'));
                        }}
                        value={email}
                        ref={register({ required: true })} />
                    {errors.email && <ErrorMessage>Email is required.</ErrorMessage>}
                </FormSection>

                <FormSection>
                    <FormLabel>Password</FormLabel>
                    <Input type="password"
                        name="password"
                        onChange={(event) => {
                            dispatch(addProject(event.target.value, 'password'));
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
                    <FormLabel >About your project</FormLabel>
                    <TextArea name="description"
                        onChange={(event) => {
                            dispatch(addProject(event.target.value, 'description'));
                        }}
                        value={description}
                        ref={register({ required: true, minLength: 5 })} />
                    {errors.description && errors.description.type === "required" && <ErrorMessage>"About you" is required.</ErrorMessage>}
                    {errors.description && errors.description.type === "minLength" && <ErrorMessage>This field required min length of 5 characters.</ErrorMessage>}
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