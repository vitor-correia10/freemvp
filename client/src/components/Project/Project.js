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
            <ProductDetails>
                <AlignBox>
                    <h1>{project.name}</h1>
                    <img></img>
                    <ProjectManager>Project Manager: name</ProjectManager>
                </AlignBox>
                <Paragraph>{project.description}</Paragraph>
                {project.Developer ?
                    <Developer>
                        project.Developer
                </Developer>
                    : <a href="/">find a developer</a>
                }
            </ProductDetails>
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

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 50%;
  margin: 40px 0;

  @media (max-width: ${THEME.mobile}) {
    margin-top: 10px;
    padding: 0 20px;
  }
`;

const Paragraph = styled.p`
  font-size: 20px;

  @media (max-width: ${THEME.mobile}) {
    margin-top: 10px;
  }
`;

const AlignBox = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
`;

const ProjectManager = styled.p`
    font-size: 14px;
`

const Developer = styled.p`
`

export default Project;