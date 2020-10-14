const initialState = {
    firstName: "",
    lastName: "",
    image: null,
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
                image: action.image,
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