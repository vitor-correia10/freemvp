const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    technologies: [],
    about: "",
};

const Developer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-DEVELOPER': {
            return {
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                technologies: action.technologies,
                about: action.about,
            }
        }
        default: {
            return state;
        }
    }
}

export default Developer;