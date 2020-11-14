const initialState = {};

const WorkingDevelopers = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-WORKING-DEVELOPERS': {
            return {
                ...state,
                ...action.value,
            }
        }
        case 'UPDATE-WORKING-DEVELOPERS': {
            return {
                ...action.value
            }
        }
        case 'REMOVE-WORKING-DEVELOPERS': {
            return {
                ...initialState,
            }
        }
        default: {
            return state;
        }
    }
}

export default WorkingDevelopers;