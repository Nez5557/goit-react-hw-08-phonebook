import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    }
};

export const register = createAsyncThunk('authorization/register',
    async (credentials, {rejectWithValue}) => {
        try {
            const responce = await
                axios.post('/users/signup', credentials)
                .then(responce => responce.data);
            token.set(responce.token);
            return responce;
            
        } catch (error) {
            return rejectWithValue(error)
        };
    });

export const login = createAsyncThunk('authorization/login',
    async (credentials, {rejectWithValue}) => {
        try {
            const responce = await
                axios.post('/users/login', credentials)
                .then(responce => responce.data);
                
            token.set(responce.token)
            return responce

        } catch (error) {
            return rejectWithValue(error)
        };
    });

export const logout = createAsyncThunk('authorization/logout',
    async (_, {rejectWithValue}) => {
        try {
            await axios.post('/users/logout');
            token.unset();
            
        } catch (error) {
            return rejectWithValue(error)
        };
    });

export const refresh = createAsyncThunk('authorization/refresh',
    async (_, { getState, rejectWithValue }) => {
        const tokenFromLocalStorage = getState().authorization.token;

        if (!tokenFromLocalStorage) {
            return rejectWithValue('not authorized');
        };

        token.set(tokenFromLocalStorage );
        try {
            const responce = await
                axios.get('/users/current')
                .then(responce => responce.data);
            return responce;

        } catch (error) {
            return rejectWithValue(error);
        }

     }
);

