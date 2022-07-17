import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setChange } from '../../store/createTaskSlice';
import styles from './UpdateTask.module.css';
// import { useState } from 'react'
const UpdateTask = (props) => {
    const { setEdit, id } = props;
    const [newTask, setNewTask] = useState('');
    const dispatch = useDispatch();
    function cancelBtn() {
        setEdit(false);
    }
    const submit = async () => {
        if (!newTask) {
            return
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                newTask: newTask
            })
        };
        await fetch(`/api/edit/${id}`, requestOptions)
        dispatch(setChange());
        setEdit(false);
    }
    return (
        <div className={styles.mask}>
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <div className={styles.center}><input className={styles.text} type="text" placeholder='write new task' value={newTask} onChange={e => setNewTask(e.target.value)} /></div>
                    <div className={styles.btnWrapper}>
                        <button className={styles.cancelBtn} onClick={cancelBtn}>Cancel</button>
                        <button className={styles.addBtn} onClick={submit}>Update Task</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateTask