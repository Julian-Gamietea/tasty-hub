export const initialState = {
    alias: "",
    password: "",
    isAliasValid: true,
    isPasswordValid: true,
    userErrorMessage: "",
    passwordErrorMessage: "",
}

export function loginReducer (state = initialState, action) {
    switch (action.type) {
        case "fieldUpdate":
            return {
                ...state,
                [action.field]: action.value,
                isAliasValid: true,
                isPasswordValid: true
            };
        case "aliasError":
            return {
                ...state,
                isAliasValid: false,
                userErrorMessage: action.error
            };
        case "passwordError":
            return {
                ...state,
                isPasswordValid: false,
                passwordErrorMessage: action.error
            };
        case "reset":
            return initialState;
        default:
            return state;
    }
}