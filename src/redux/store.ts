import {
    AnyAction,
    configureStore,
    ConfigureStoreOptions,
    ThunkDispatch
} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import productsReducer from './slices/productsSlice'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";



const storeOptions: ConfigureStoreOptions = {
    reducer: {
        auth: authReducer,
        user: userReducer,
        products: productsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
};


export const store = configureStore(storeOptions);


export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
