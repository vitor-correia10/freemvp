const initialState = {
    type: ['developer'],
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    password: "",
    technologies: [],
    about: "",
    projectID: null,
};

const LoggedUser = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-LOGGEDIN-USER': {
            return {
                ...state,
                ...action.value,
            }
        }
        case 'REMOVE-LOGGEDIN-USER': {
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

export default LoggedUser;