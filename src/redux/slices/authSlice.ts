import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {deleteCookie, getCookie, hasCookie, setCookie} from 'cookies-next';
import {API_BASE_URL} from '../../../config';
import axios from "axios";
import {CookieSerializeOptions} from "cookie";
import {RootState} from "@/redux/store";

axios.defaults.baseURL = API_BASE_URL;
const accessCookieOptions: CookieSerializeOptions = {
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
    maxAge: 3600 * 24,
}

const refreshCookieOptions: CookieSerializeOptions = {
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
    maxAge: 3600 * 24 * 30,
}

const cookieOptions: CookieSerializeOptions = {
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    path: '/',
}

const setAuthCookies = (data: { access: string; refresh: string }) => {
    setCookie('refresh', data.refresh, refreshCookieOptions);
    setCookie('access', data.access, accessCookieOptions);
}

const deleteAuthCookies = () => {
    deleteCookie('refresh', cookieOptions);
    deleteCookie('access', cookieOptions);
}

export const register = createAsyncThunk(
    'auth/register',
    async (data: { email: string; firstName: string, lastName: string, password: string }) => {
        const response = await axios.post('/api/auth/register', data);
        deleteAuthCookies();
        setAuthCookies(response.data);
        return response.data;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (data: { email: string; password: string }) => {
        const response = await axios.post('/api/auth/authenticate', data);
        deleteAuthCookies();
        setAuthCookies(response.data);
        return response.data;
    }
);

export const validateToken = createAsyncThunk(
    'auth/validateToken',
    async (_, {rejectWithValue}) => {
        if (hasCookie('access', cookieOptions) && hasCookie('refresh', cookieOptions)) {
            const access = getCookie('access', cookieOptions);
            const refresh = getCookie('refresh', cookieOptions);
            try {
                const response = await axios.post('/api/auth/validate-token', {token: access});
                if (response.status === 200) {
                    return {access, refresh}
                }
            } catch (error) {
                return rejectWithValue({message: 'Access token невалиден'});
            }
        } else {
            return rejectWithValue({message: 'Токены авторизации отсутствуют'});
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { getState}) => {
        const {auth} = getState() as RootState;
        const response = await axios.get('/api/auth/logout', {
            headers: {
                Authorization: `Bearer ${auth.access}`
            }
        });
        deleteAuthCookies();
        return response.data;
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, {rejectWithValue }) => {
        if (hasCookie('refresh', cookieOptions)) {
            const refresh = getCookie('refresh', cookieOptions);
            const response = await axios.post('/api/auth/refresh-token', {refresh: refresh});
            if (response.status === 200) {
                deleteAuthCookies();
                setAuthCookies(response.data);
                return response.data;
            } else {
                deleteAuthCookies();
                return rejectWithValue({message: 'Refresh token невалиден'});
            }
        } else {
            deleteAuthCookies();
            return rejectWithValue({message: 'Refresh token отсутствует'});
        }
    }
);


interface AuthState {
    access: string | null;
    refresh: string | null;
    isAuthenticated: boolean;
    isLoaded: boolean;
    error: string | undefined;
}

const initialState: AuthState = {
    access: null,
    refresh: null,
    isAuthenticated: false,
    isLoaded: false,
    error: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
                state.isLoaded = true;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoaded = true;
                state.access = null;
                state.refresh = null;
                state.isAuthenticated = false;
                if (action.error.message === 'Request failed with status code 400') {
                    state.error = 'Пользователь с таким email уже существует';
                } else {
                    state.error = action.error.message;
                }
            })
            .addCase(login.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
                state.isLoaded = true;
                state.isAuthenticated = true;
                state.error = undefined;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoaded = true;
                state.access = null;
                state.refresh = null;
                state.isAuthenticated = false;
                if (action.error.message === 'Request failed with status code 401') {
                    state.error = 'Неверный логин или пароль';
                } else {
                    state.error = action.error.message;
                }
            })
            .addCase(validateToken.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(validateToken.fulfilled, (state, action) => {
                state.isLoaded = true;
                if (action.payload) {
                    state.isAuthenticated = true;
                    state.access = action.payload.access as string
                    state.refresh = action.payload.refresh as string;
                } else {
                    state.isAuthenticated = false;
                    state.access = null;
                    state.refresh = null;
                }
            })
            .addCase(validateToken.rejected, (state) => {
                state.isLoaded = true;
                state.isAuthenticated = false;
                state.access = null;
                state.refresh = null;
            })
            .addCase(refreshToken.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.isLoaded = true;
                state.isAuthenticated = true;
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.isLoaded = true;
                state.isAuthenticated = false;
                state.access = null;
                state.refresh = null;
            })
            .addCase(logout.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoaded = true;
                state.isAuthenticated = false;
                state.access = null;
                state.refresh = null;
            })
            .addCase(logout.rejected, (state) => {
                state.isLoaded = true;
                state.isAuthenticated = false;
                state.access = null;
                state.refresh = null;
            })
    },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
