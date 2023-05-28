import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../comun/comun';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      console.log( action.payload )
      return {...state, errMess: null, comentarios: state.comentarios.concat(action.payload)}
      
    default:
      return state;
  }
};