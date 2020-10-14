export const addDeveloper = (firstName, lastName, image, email, technologies, about) => {
    return {
        type: "ADD-DEVELOPER",
        firstName,
        lastName,
        image,
        email,
        technologies,
        about,
    };
};

export const toggleLogin = () => {
    return {
        type: "TOGGLE",
    };
};