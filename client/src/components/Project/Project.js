import React from 'react';
import styled from 'styled-components/macro';
import { useParams } from "react-router-dom";
import { THEME } from "../style/Theme";
import Image from "./Image";

const Project = () => {
    const { name } = useParams();
    const [project, setProject] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const fetchProject = async () => {
        const response = await fetch(`http://localhost:8080/project/${name}`, {
            method: 'GET',
            name
        })
            .then(res => res.json())
            .then((responseBody) => {
                const { status, data } = responseBody;
                if (status === 'success') {
                    setProject(data);
                    setLoading(false);
                } else {
                    console.log('Error');
                }
            })
    };

    React.useEffect(() => {
        fetchProject();
    }, []);
    if (loading) {
        return loading;
    }
    return (
        <Wrapper>
            <Image itemSrc={"/uploads/" + project.image} />
            {project.name}
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: block;

  @media (min-width: ${THEME.mobile}) {
    display: flex;
    margin: 0 40px 40px 40px;
  }
`;


export default Project;