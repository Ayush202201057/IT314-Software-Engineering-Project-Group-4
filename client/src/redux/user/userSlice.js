import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    Error: null,
    Loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.Loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.Loading = false;
            state.Error = null;
        },
        signInFailure: (state, action) => {
            state.Error = action.payload;
            state.Loading = false;
        },
        clearError: (state) => {
            state.Error = null;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure, clearError } = userSlice.actions;

export default userSlice.reducer;