import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import Navbar from './components/navbar/Navbar';
// import { useState } from 'react';
import HomePage from './pages/homepage/HomePage';
import { useSelector } from 'react-redux';

function App() {
    // const [auth, setAuth] = useState(false);
    const { isAuth } = useSelector((state) => state.auth)
    return (
        <>
            {isAuth === true && <Navbar />}
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/signup' element={<SignUp />}></Route>
                <Route path='/home' element={<HomePage />}></Route>
            </Routes>
        </>
    );
}

export default App;
