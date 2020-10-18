const initialState = {
    name: "",
    description: "",
    image: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    technologies: {},
};

const Project = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-PROJECT': {
            return {
                ...state,
                [action.key]: action.value
            }
        }
        case 'ADD-TECHNOLOGIES': {
            return {
                ...state,
                technologies: { ...state.technologies, [action.value]: !state.technologies[action.value] },
            }
        }
        default: {
            return state;
        }
    }
}

export default Project;