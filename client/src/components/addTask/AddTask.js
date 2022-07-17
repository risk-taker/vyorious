import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChange } from '../../store/createTaskSlice';
import styles from './AddTask.module.css';

const AddTask = (props) => {
    const { setTask } = props;
    const [addTask, setAddTask] = useState("");
    const dispatch = useDispatch();

    const submit = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task: addTask
            })
        };
        if (!addTask) {
            return
        }
        await fetch('/api/add-task', requestOptions);
        window.alert("Successfully added task");
        setAddTask('');
        dispatch(setChange());
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.center}><input className={styles.text} type="text" placeholder='write your task' value={addTask} onChange={(e) => setAddTask(e.target.value)} /></div>
                <div className={styles.btnWrapper}>
                    <button className={styles.cancelBtn} onClick={() => setTask(false)}>Cancel</button>
                    <button className={styles.addBtn} onClick={submit}>Add Task</button>
                </div>
            </div>
        </div>
    )
}

export default AddTask