import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import createTaskReducer from './createTaskSlice';
import createSagaMiddleware from 'redux-saga';
import taskSaga from './sagas/taskSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authReducer,
        task: createTaskReducer
    },
    // middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
    middleware: [sagaMiddleware]
})
sagaMiddleware.run(taskSaga)
export default store;