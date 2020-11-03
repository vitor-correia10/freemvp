const initialState = {};

const RelatedProjects = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-RELATED-PROJECTS': {
            return {
                ...state,
                ...action.value,
            }
        }
        case 'REMOVE-RELATED-PROJECTS': {
            return {
                ...initialState,
            }
        }
        default: {
            return state;
        }
    }
}

export default RelatedProjects;