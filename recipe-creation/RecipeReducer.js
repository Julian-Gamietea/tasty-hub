export const initialState = {
    id: null,
    description: "",
    duration: 0,
    images: [],
    name: "",
    ownerId: 0,
    peopleAmount: 0,
    portions: 0,
    typeId: 0,
    enabled: false,
    typeDescription: "",
    
}

export function recipeReducer (state = initialState, action) {
    switch (action.type) {
        case "fieldUpdate":
            return {
                ...state,
                [action.field]: action.value,
            };
        case "AddImage":
            const aux = state.images.slice(0, state.images.length);
            aux.push(action.image);
            return {
                ...state,
                images: aux
            };
        case "reset":
            return initialState;
        case "set":
            return {...action.state};
        default:
            return state;
    }
}