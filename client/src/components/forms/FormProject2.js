import React from 'react';
import styled from 'styled-components/macro';
import { THEME } from '../style/Theme';
import { useForm } from "react-hook-form";

//Redux
import { addProject, addTechnologies, toggleModal } from '../../Actions';
import { useSelector, useDispatch } from "react-redux";

//Components
import { ErrorMessage } from '../style/ErrorMessage';
import { FormLabel } from '../Labels';
import { MainHeader } from '../style/Headings';
import { FormSubmitButton } from '../style/Buttons';
import { useHistory } from 'react-router-dom';

const FormProject2 = () => {
    const { register, errors, handleSubmit } = useForm();
    const email = useSelector((state) => state.User.email);
    const loggedEmail = useSelector((state) => state.LoggedUser.email);
    const name = useSelector((state) => state.Project.name);
    const image = useSelector((state) => state.Project.image);
    const description = useSelector((state) => state.Project.description);
    const technologies = useSelector((state) => state.Project.technologies);
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogin = useSelector((state) => !!state.LoggedUser.email);
    const [projectExist, setProjectExist] = React.useState(false);

    const onSubmit = (data) => {
        const formData = new FormData();

        formData.append("name", name)
        formData.append("email", email)
        if (!email) {
            formData.append("loggedEmail", loggedEmail)
        }
        formData.append("image", image)
        formData.append("description", description)
        formData.append("technologies", JSON.stringify(technologies))

        fetch('http://localhost:8080/project', {
            method: 'POST',
            body: formData,
        })

            .then(res => res.json())
            .then((responseBody) => {
                const { status } = responseBody;
                if (status === 'success') {
                    if (isLogin) {
                        history.push(`/user`);
                    } else {
                        history.push(`/`);
                        dispatch(toggleModal());
                    }
                } else if (status === 'projectExist') {
                    setProjectExist(true);
                } else {
                    console.log('Error');
                }
            })
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <MainHeader>About Your Project</MainHeader>

                <FormSection>
                    <FormLabel>Title</FormLabel>
                    <Input
                        type="text"
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

                {projectExist ?
                    <FormSection>
                        <ErrorMessage>Project's Name Already Exist. </ErrorMessage>
                    </FormSection>
                    : ''}
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

const TextArea = styled.textarea`
    height: 70px;
    width: 50%;
    min-width: 300px;
    max-width: 500px;
`

const InputCheckbox = styled.input`
    margin-left: 20px;
`

export default FormProject2;