export const addDeveloper = (firstName, lastName, email, technologies, about) => {
    return {
        type: "ADD-DEVELOPER",
        firstName,
        lastName,
        email,
        technologies,
        about,
    };
};
