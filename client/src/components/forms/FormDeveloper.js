import React from 'react';
import styled from 'styled-components/macro';

import { useForm } from "react-hook-form";

//Redux
import { addDeveloper } from '../../Actions';
import { useSelector, useDispatch } from "react-redux";


const FormDeveloper = () => {
    const { register, errors, handleSubmit } = useForm();
    const firstName = useSelector((state) => state.Developer.firstName);
    const lastName = useSelector((state) => state.Developer.lastName);
    const email = useSelector((state) => state.Developer.email);
    const technologies = useSelector((state) => state.Developer.technologies);
    const about = useSelector((state) => state.Developer.about);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Developer</h1>
                <label>First Name</label>
                <input name="firstName" ref={register({ required: true })} />
                {errors.firstName && "First name is required"}

                <label>Last Name</label>
                <input name="lastName" ref={register({ required: true })} />
                {errors.lastName && "Last name is required"}

                <label>Email</label>
                <input name="email" type="email" ref={register({ required: true })} />

                <label>Technologies</label>
                <input type="checkbox" name="technologies" value="Javascript" ref={register({ required: false })} />Javascript
                <input type="checkbox" name="technologies" value="React" ref={register({ required: false })} />React
                <input type="checkbox" name="technologies" value="Node" ref={register({ required: false })} />Node
                <input type="checkbox" name="technologies" value="Mongo" ref={register({ required: false })} />Mongo

                <label >About you</label>
                <textarea name="about" ref={register({ required: true })} />
                {errors.about && "About you is required"}

                <button type="submit" onClick={() => dispatch(addDeveloper(firstName, lastName, email, technologies, about))}>
                    Submit
                </button>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    text-align: center;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 10;
`

export default FormDeveloper;