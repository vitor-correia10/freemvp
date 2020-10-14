const initialState = {
    isLogin: false,
};

const LoginTogglerReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case "TOGGLE": {
            return {
                isLogin: !newState.isLogin,
            };
        }
        default: {
            return state;
        }
    }
};

export default LoginTogglerReducer;
