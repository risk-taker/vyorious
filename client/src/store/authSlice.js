import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        name: ''
    },
    reducers: {
        setAuth(state, action) {
            state.name = action.payload;
            if (state.name === undefined) {
                state.isAuth = false
            } else {
                state.isAuth = true;
            }
        },
        setLogout(state, action) {
            state.name = ''
            state.isAuth = false
        }
    }
})

export const { getAuth, setAuth, setLogout } = authSlice.actions;
export default authSlice.reducer;