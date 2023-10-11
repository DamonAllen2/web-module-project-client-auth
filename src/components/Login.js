import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../axiosAuth";
import { Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    let initialValues = {
        username: '',
        password: '',
    }

    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState(false);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        axiosWithAuth().get('http://localhost:9000/api/friends')
            .then((res) => {
                console.log(res.data);
                setLogged(true);
            })
            .catch((err) => {
                setLogged(false);
            })
    }, [])

    const onChange = (evt) => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value,
        })
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        setValues({
            username: '',
            password: '',
        })
        axios.post('http://localhost:9000/api/login', {
            username: values.username,
            password: values.password,
        })
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                navigate('/friends')
            })
            .catch((err) => {
                console.error(err);
                setError(true);
            })
    }
    return (
        <div className="login-component">
            <h1>Log in</h1>
            <h4>{error === true ? 'INVALID CREDENTIALS' : ''}</h4>
            {logged === true ?
                <div className="friends-list-error">
                    <h2>Error: You are already signed in!</h2>
                    <Link to='/logout'>Click to see sign out page</Link>
                </div>
                :
                <form onSubmit={onSubmit}>
                    <input type='text' placeholder="Username here" name="username" onChange={onChange} value={values.username} />
                    <input type='password' placeholder="Password here" name="password" onChange={onChange} value={values.password} />
                    <button type="submit">Log in</button>
                </form>
            }
        </div>
    )
}