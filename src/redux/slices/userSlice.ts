import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_BASE_URL} from '../../../config';
import axios from "axios";
import {RootState} from "@/redux/store";
import {logout} from "@/redux/slices/authSlice";

axios.defaults.baseURL = API_BASE_URL;

export const loadMe = createAsyncThunk(
    'user/loadMe',
    async (_, { getState}) => {
        const {auth} = getState() as RootState;
        const response = await axios.get('/api/auth/me', {
            headers: {
                Authorization: `Bearer ${auth.access}`
            }
        });
        return response.data;
    }
);

interface Authority {
    authority: string
}

interface UserState {
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    authorities: Authority[] | undefined
    isAuthorized: boolean;
    isLoaded: boolean;
    error: string | undefined;
}

const initialState: UserState = {
    email: undefined,
    firstName: undefined,
    lastName: undefined,
    authorities: undefined,
    isAuthorized: false,
    isLoaded: false,
    error: undefined,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadMe.pending, (state) => {
                state.isLoaded = false;
                state.error = undefined;
            })
            .addCase(loadMe.fulfilled, (state, action) => {
                state.email = action.payload.email;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.authorities = action.payload.authorities;
                state.isAuthorized = true;
                state.isLoaded = true;
                state.error = undefined;
            })
            .addCase(loadMe.rejected, (state, action) => {
                state.isLoaded = true;
                state.error = action.error.message;
            })
            .addCase(logout.pending, (state) => {
                state.isLoaded = false;
                state.error = undefined;
            })
            .addCase(logout.fulfilled, (state) => {
                state.email = undefined;
                state.firstName = undefined;
                state.lastName = undefined;
                state.isAuthorized = false;
                state.isLoaded = true;
                state.error = undefined;
            })
            .addCase(logout.rejected, (state) => {
                state.email = undefined;
                state.firstName = undefined;
                state.lastName = undefined;
                state.isAuthorized = false;
                state.isLoaded = true;
                state.error = undefined;
            })

    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
