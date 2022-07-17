import { call, put, takeEvery } from 'redux-saga/effects'
import { sendError, setTask } from '../createTaskSlice';

function* fetchTask(action) {
    try {
        const res = yield call(() => fetch('/api/tasks'));
        const tasks = yield res.json()
        yield put(setTask(tasks));
    } catch (e) {
        yield put(sendError(e));
    }
}

function* taskSaga() {
    yield takeEvery("task/getTask", fetchTask);
}

export default taskSaga;