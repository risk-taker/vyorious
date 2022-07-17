import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../store/authSlice';
import AddTask from '../addTask/AddTask';

const Navbar = () => {
    const navigate = useNavigate();
    const [task, setTask] = useState(false);
    const dispatch = useDispatch();

    function logout() {
        fetch('/api/logout')
            .then(response => response.json())
            .then(data => { });
        dispatch(setLogout())
        navigate('/', { replace: true });
    }
    function raiseDoubt() {
        setTask(true);
    }

    return (
        <>
            <div className={`${styles.wrapper} container`}>
                <Link className={styles.logoWrapper} to="/home">
                    <img src="/images/logo.png" alt="logo" />
                    <h3 style={{ "fontWeight": "bold" }}>Hey Task</h3>
                </Link>
                <div>
                    <button className={styles.link} onClick={raiseDoubt}>Add Task</button>
                    <button onClick={logout} className={styles.btn}>Logout</button>
                </div>
            </div>
            {task && <AddTask setTask={setTask} />}
        </>
    )
}

export default Navbar