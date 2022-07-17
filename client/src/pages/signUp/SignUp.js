import React, { useState } from 'react';
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/authSlice';

const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submit = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password
            })
        };
        if (!name || !email || !password || !cnfPassword) {
            return
        }
        const response = await fetch('/api/signup', requestOptions)
        const data = await response.json();
        const { name: myName } = data
        console.log(myName)
        dispatch(setAuth(myName));
        navigate('/home', { replace: false })
    }

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <input className={styles.text} type="text" name="name" id="myName" placeholder='enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                <input className={styles.text} type="text" name="email" id="myEmail" placeholder='email id' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className={styles.text} type="password" name="password" id="myPassword" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className={styles.text} type="password" name="cnfpassword" id="myCnfPassword" placeholder='confirm password' value={cnfPassword} onChange={(e) => setCnfPassword(e.target.value)} />
                <button className={styles.btn} onClick={submit} >Sign up</button>
                <div className={styles.notRegistered}>
                    <p>Already Registered</p>
                    <Link className={styles.link} to="/">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp