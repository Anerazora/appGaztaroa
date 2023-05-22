import * as ActionTypes from './ActionTypes';
import app from '../firebaseConfig';
import 'firebase/database';
import { getDatabase, ref, onValue, push, get} from "firebase/database";
const database = getDatabase(app);
// export const fetchComentarios = () => (dispatch) => {
//     return fetch(baseUrl + 'comentarios')
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             } else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//         .then(response => response.json())
//         .then(comentarios => dispatch(addComentarios(comentarios)))
//         .catch(error => dispatch(comentariosFailed(error.message)));
// };
export const fetchComentarios = () => (dispatch) => {

    const comentariosRef = ref(database, "comentarios");

    // Suscribirse a los cambios de los datos en tiempo real
    onValue(comentariosRef, (snapshot) => {
    const comentarios = snapshot.val();
    dispatch(addComentarios(comentarios));
    }, (error) => {
    dispatch(comentariosFailed(error.message));
    });
};
export const comentariosFailed = (errmess) => ({
    type: ActionTypes.COMENTARIOS_FAILED,
    payload: errmess
});

export const addComentarios = (comentarios) => ({
    type: ActionTypes.ADD_COMENTARIOS,
    payload: comentarios
});

// export const fetchExcursiones = () => (dispatch) => {

//     dispatch(excursionesLoading());

//     return fetch(baseUrl + 'excursiones')
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             } else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//         .then(response => response.json())
//         .then(excursiones => dispatch(addExcursiones(excursiones)))
//         .catch(error => dispatch(excursionesFailed(error.message)));
// };
export const fetchExcursiones = () => (dispatch) => {

    dispatch(excursionesLoading());
     
    const excursionesRef = ref(database, "excursiones");

    // Suscribirse a los cambios de los datos en tiempo real
    onValue(excursionesRef, (snapshot) => {
    const excursiones = snapshot.val();
    dispatch(addExcursiones(excursiones));
    }, (error) => {
    dispatch(excursionesFailed(error.message));
    });
};
export const excursionesLoading = () => ({
    type: ActionTypes.EXCURSIONES_LOADING
});

export const excursionesFailed = (errmess) => ({
    type: ActionTypes.EXCURSIONES_FAILED,
    payload: errmess
});

export const addExcursiones = (excursiones) => ({
    type: ActionTypes.ADD_EXCURSIONES,
    payload: excursiones
});

// export const fetchCabeceras = () => (dispatch) => {

//     dispatch(cabecerasLoading());

//     return fetch(baseUrl + 'cabeceras')
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             } else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//         .then(response => response.json())
//         .then(cabeceras => dispatch(addCabeceras(cabeceras)))
//         .catch(error => dispatch(cabecerasFailed(error.message)));
// };
export const fetchCabeceras = () => (dispatch) => {

    dispatch(cabecerasLoading());
     
    const cabecerasRef = ref(database, "cabeceras");

    // Suscribirse a los cambios de los datos en tiempo real
    onValue(cabecerasRef, (snapshot) => {
    const cabeceras = snapshot.val();
    dispatch(addCabeceras(cabeceras));
    }, (error) => {
    dispatch(cabecerasFailed(error.message));
    });
};
export const cabecerasLoading = () => ({
    type: ActionTypes.CABECERAS_LOADING
});

export const cabecerasFailed = (errmess) => ({
    type: ActionTypes.CABECERAS_FAILED,
    payload: errmess
});

export const addCabeceras = (cabeceras) => ({
    type: ActionTypes.ADD_CABECERAS,
    payload: cabeceras
});

// export const fetchActividades = () => (dispatch) => {

//     dispatch(actividadesLoading());

//     return fetch(baseUrl + 'actividades')
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             } else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//         .then(response => response.json())
//         .then(actividades => dispatch(addActividades(actividades)))
//         .catch(error => dispatch(actividadesFailed(error.message)));
// };
export const fetchActividades = () => (dispatch) => {

    dispatch(actividadesLoading());
     
    const actividadesRef = ref(database, "actividades");

    // Suscribirse a los cambios de los datos en tiempo real
    onValue(actividadesRef, (snapshot) => {
    const actividades = snapshot.val();
    dispatch(addActividades(actividades));
    }, (error) => {
    dispatch(actividadesFailed(error.message));
    });
};
export const actividadesLoading = () => ({
    type: ActionTypes.ACTIVIDADES_LOADING
});

export const actividadesFailed = (errmess) => ({
    type: ActionTypes.ACTIVIDADES_FAILED,
    payload: errmess
});

export const addActividades = (actividades) => ({
    type: ActionTypes.ADD_ACTIVIDADES,
    payload: actividades
});

export const postFavorito = (excursionId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorito(excursionId));
    }, 2000);
};

export const addFavorito = (excursionId) => ({
    type: ActionTypes.ADD_FAVORITO,
    payload: excursionId
});

// export const postComentario = (excursionId, valoracion, autor, comentario) => (dispatch) => {
//     let dia = new Date().toString();
//     setTimeout(() => {
//         dispatch(addComentario(excursionId, valoracion, autor, comentario, dia));
//     }, 2000);
// };
export const postComentario = (comentario) => (dispatch) => {
    const comentariosRef = ref(database, "comentarios");
    console.log(comentario);
    get(comentariosRef).then((snapshot) => {

      const longitud = Object.keys(snapshot.val()).length;
      //console.log(longitud)
      const comentarioConId = { ...comentario, id: longitud };
    //   console.log(comentarioConId);
      push(comentariosRef, comentarioConId)
    
        .then(() => {
          dispatch(addComentario(comentarioConId));
        })
        .catch((error) => {
          dispatch(comentariosFailed(error.message));
        });
    }).catch((error) => {
        console.log(error)
    });;
};


    // try {
    //   const comentariosRef1 = ref(database, "comentarios"); // Obtiene la referencia a la ubicación 'comentarios' en Realtime Database
    //   onValue(comentariosRef1, (snapshot) => {
    //     const id = snapshot.numChildren(); // Obtener la longitud de los comentarios existentes
    //     comentariosFailed.log(id)
    //     const comentarioConId = { ...comentario, id }; // Agregar el campo "id" al comentario
  
    //     push(comentariosRef1, comentarioConId);
    //     dispatch(addComentario(comentarioConId));
    //   });
    // } catch (error) {
    //   dispatch(comentariosFailed(error.message)); // Dispatch una acción en caso de error
    // }

export const addComentario = ( comentario) => ({
    type: ActionTypes.ADD_COMENTARIO,
    payload: comentario,
    //  {
    //     excursionId: excursionId,
    //     valoracion: valoracion,
    //     comentario: comentario,
    //     autor: autor,
    //     dia: dia
    // },
});