const initialState = {
    name: "",
    description: "",
    image: "",
    technologies: {},
    admin: null,
    developers: [],
    relatedUsers: null,
};

const Project = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-PROJECT': {
            return {
                ...state,
                [action.key]: action.value
            }
        }
        case 'ADD-LOGGEDIN-PROJECT': {
            return {
                ...state,
                ...action.value,
            }
        }
        case 'REMOVE-LOGGEDIN-PROJECT': {
            return {
                ...initialState,
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