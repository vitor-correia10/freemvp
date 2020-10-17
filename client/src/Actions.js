export const addDeveloper = (value, key) => {
    return {
        type: "ADD-DEVELOPER",
        key,
        value,
    };
};

export const addTechnologies = (value, key) => {
    return {
        type: "ADD-TECHNOLOGIES",
        key,
        value,
    };
}

export const toggleLogin = () => {
    return {
        type: "TOGGLE-LOGIN",
    };
};

export const toggleModal = () => {
    return {
        type: "TOGGLE",
    };
};