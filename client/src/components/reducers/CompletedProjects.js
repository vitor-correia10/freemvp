const initialState = {};

const CompletedProjects = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-COMPLETED-PROJECTS': {
            return {
                ...state,
                ...action.value,
            }
        }
        case 'UPDATE-COMPLETED-PROJECTS': {
            return {
                ...state,
                ...action.value,
            }
        }
        case 'REMOVE-COMPLETED-PROJECTS': {
            return {
                ...initialState,
            }
        }
        default: {
            return state;
        }
    }
}

export default CompletedProjects;