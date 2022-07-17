import { useEffect } from 'react';
import Task from '../../components/task/Task';
import styles from './HomePage.module.css';
import { getTask } from '../../store/createTaskSlice';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = () => {
    const dispatch = useDispatch()
    const { data: tasks } = useSelector((state) => state.task);
    const { status } = useSelector((state) => state.task);
    useEffect(() => {
        dispatch(getTask());
    }, [dispatch, status])

    return (
        <div className={`container`}>
            <h2 style={{ "fontWeight": "bold", "marginTop": "2rem" }}>All Task</h2>
            <div className={styles.wrapper}>
                <div className="container">
                    {
                        tasks.map(task => <Task task={task} key={task._id} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage