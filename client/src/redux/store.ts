import { configureStore } from '@reduxjs/toolkit'; // Using Redux Toolkit
import { rootReducer } from './reducers';


export const store = configureStore({ 
    reducer: rootReducer, 
});

const { dispatch } = store;
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;