import { configureStore } from '@reduxjs/toolkit';
import { ClientStore } from './client-store/client-store';


export const Store = configureStore(
    {
        reducer: {
            //+++++++ CLIENT STORE ++++++++++++
            ... ClientStore,
            
        }
    }
);

export type RootState= ReturnType<typeof Store.getState>;
export type AppDispatch= typeof Store.dispatch;
