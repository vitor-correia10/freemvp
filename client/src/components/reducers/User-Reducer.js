const initialState = {
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    password: "",
    technologies: [],
    about: "",
};

const User = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-USER': {
            return {
                ...state,
                [action.key]: action.value
                // == 'technologies'
                // ? { ...state.technologies, [action.value]: !state.technologies[action.value] }
                // : action.value,
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

export default User;