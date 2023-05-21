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
      // const newComment = { ...action.payload, id: state.comentarios.length};
      // return {
      //   ...state,
      //   errMess: null,
      //   comentarios: [...state.comentarios, newComment],
        
      // };
    // case ActionTypes.ADD_COMENTARIO:
    //   let aumentoid = 0;
    //   state.comentarios.map((comentario) => {

    //     if (comentario.id > aumentoid)
    //       aumentoid = comentario.id;
    //   });

    //   aumentoid++;
    //   action.payload.id = aumentoid;
    //   let errmsg = null;

    //   const requestOptions = {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(action.payload)
    //   };

    //   fetch(baseUrl + 'comentarios/' + aumentoid + '.json', requestOptions)
    //     .then(response => response.json())
    //     .catch((error) => {
    //       console.error(error);
    //       errmsg = error.message;
    //     });

    //   return { ...state, errMess: errmsg, comentarios: state.comentarios.concat(action.payload) };

    default:
      return state;
  }
};