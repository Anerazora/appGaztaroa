import * as ActionTypes from './ActionTypes';

export const favoritos = (state = { favoritos: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            const excursionId = action.payload;
            if (state.favoritos.includes(excursionId)) {
                return state
            } else {
                return {
                    ...state, favoritos: [...state.favoritos, excursionId]
                }
            }
        default:
            return state;
    }
};