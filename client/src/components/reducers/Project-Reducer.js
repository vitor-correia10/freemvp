const initialState = {
    name: "",
    description: "",
    image: "",
    technologies: {},
    admin: null,
    workingDevelopers: [],
    pendingDevelopers: [],
    appliedToDevelopers: [],
    isCompleted: false,
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
        case 'UPDATE-PROJECT': {
            return {
                ...state,
                [action.key]: action.value
            }
        }
        case 'REMOVE-LOGGEDIN-PROJECT': {
            return {
                ...initialState,
            }
        }
        case 'ADD-PROJECT-TECHNOLOGIES': {
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