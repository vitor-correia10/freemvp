const initialState = {
    _id: "",
    type: ['developer'],
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    password: "",
    technologies: {},
    about: "",
    projectID: null,
    relatedProjects: null,
    workingProjects: [],
    pendingProjects: [],
    appliedToProjects: [],
};

const User = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-USER': {
            return {
                ...state,
                [action.key]: action.value
            }
        }
        case 'ADD-USER-TECHNOLOGIES': {
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

export default User;