import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';

export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {
            excursiones: excursiones,
            comentarios: comentarios,
            cabeceras: cabeceras,
            actividades: actividades,
        },
        middleware: [thunk],
    });

    return store;
}