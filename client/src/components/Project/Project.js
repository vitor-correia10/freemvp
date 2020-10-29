import React from 'react';
import styled from 'styled-components/macro';
import { useParams } from "react-router-dom";

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
        <>
            {project.name}
        </>
    )
}





export default Project;