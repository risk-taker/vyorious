import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChange } from '../../store/createTaskSlice';
import styles from './Task.module.css';
import UpdateTask from '../updateTask/UpdateTask';

const Task = (props) => {
    const { task } = props
    const id = task._id;
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const editBtn = async () => {
        setEdit(true);
    }
    const deleteBtn = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        await fetch(`/api/delete/${id}`, requestOptions)
        dispatch(setChange());
    }
    return (
        <>
            <div className={styles.card}>
                <div className={styles.left}>
                    <p>{task.task}</p>
                </div>
                <div className={styles.right}>
                    <img style={{ "height": "30px", "cursor": "pointer" }} src="/images/edit.png" alt="edit" onClick={editBtn} />
                    <img style={{ "height": "30px", "marginLeft": "40px", "cursor": "pointer" }} src="/images/delete.png" alt="delete" onClick={deleteBtn} />
                </div>
            </div>
            {edit && <UpdateTask setEdit={setEdit} id={id} />}
        </>
    )
}

export default Task