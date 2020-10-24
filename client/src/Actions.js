export const addUser = (value, key) => {
    return {
        type: "ADD-USER",
        key,
        value,
    };
};

export const addLoggedInUser = (value, key) => {
    return {
        type: "ADD-LOGGEDIN-USER",
        key,
        value,
    };
};

export const updateUser = (value, key) => {
    return {
        type: "UPDATE-USER",
        key,
        value,
    };
};

export const removeLoggedInUser = (value, key) => {
    return {
        type: "REMOVE-LOGGEDIN-USER",
        key,
        value,
    };
};

export const loginUser = (value, key) => {
    return {
        type: "LOGIN-USER",
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

export const addProject = (value, key) => {
    return {
        type: "ADD-PROJECT",
        key,
        value,
    };
};

export const toggleModal = () => {
    return {
        type: "TOGGLE",
    };
};