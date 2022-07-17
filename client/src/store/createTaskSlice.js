import { createSlice } from "@reduxjs/toolkit";

const createTaskSlice = createSlice({
    name: 'task',
    initialState: {
        data: [],
        status: 'noChange'
    },
    reducers: {
        getTask(state, action) {
        },
        setTask(state, action) {
            const tasks = action.payload;
            state.data = tasks;

        },
        sendError(state, action) {
            console.log(action.payload);
        },
        setChange(state, action) {
            if (state.status === 'noChange') {
                state.status = 'changed';
            } else {
                state.status = 'noChange';
            }
        }
    }
})

export const { getTask, setTask, sendError, setChange } = createTaskSlice.actions;
export default createTaskSlice.reducer;