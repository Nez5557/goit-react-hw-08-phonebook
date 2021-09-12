import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refresh } from './authorization-operations';

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: null,
    error: null,
    refreshLoader: false
};

const authorizationSlice = createSlice({
    name: 'autorization',
    initialState,
    extraReducers: {
        // register reducers
        [register.fulfilled]: (state, { payload }) => {
            state.error = null;
            state.user.name = payload.user.name;
            state.user.email = payload.user.email;
            state.token = payload.token;
            state.isLoggedIn = true
        },
        [register.rejected]: (state, action) => {
            state.error = action.payload;
        },
                
        // login reducers
        [login.fulfilled]: (state, { payload }) => {
            state.error = null;
            state.user.name = payload.user.name;
            state.user.email = payload.user.email;
            state.token = payload.token;
            state.isLoggedIn = true
        },
        [logout.fulfilled]: (state) => {
            state.error = null;
            state.user = initialState.user;
            state.token = initialState.token;
            state.isLoggedIn = initialState.isLoggedIn;
            state.error = initialState.error
        },

        // refresh reducers
        [refresh.pending]: (state, action) => {
            state.refreshLoader = true;
        },
        [refresh.fulfilled]: (state, { payload }) => {
            state.error = null;
            state.user.name = payload.name;
            state.user.email = payload.email;
            state.isLoggedIn = true;
            state.refreshLoader = false;
        },
        [refresh.rejected]: (state, action) => {
            state.error = action.payload;
            state.refreshLoader = false;
        },
    },
});

export default authorizationSlice.reducer;