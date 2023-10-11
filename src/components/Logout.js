import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../axiosAuth";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";

export default function LogOut() {
    const [error, setError] = useState(false);

    useEffect(() => {
        axiosWithAuth().get('http://localhost:9000/api/friends')
        .then((res) => {
            console.log(res.data);
            setError(false)
        })
        .catch((err) => {
            setError(true)
        })
    }, [])

    const onClick = () => {
        const token = localStorage.getItem('token');
        axios.post('http://localhost:9000/api/logout', {}, {
            headers: {
                authorization: token
            }
        })
        .then((res) => {
            localStorage.removeItem('token');
        })
    }

    return (
        <div className="add-friend">
            <h1>Log out?</h1>
            {error === true ?
                <div className="friends-list-error">
                    <h2>Error: You are logged out!</h2>
                    <Link to='/login'>Click to return to log in page</Link>
                </div>
                : 
                <div>
                    <button onClick={onClick}>Click to sign out</button>
                </div>
                }
        </div>
    )
}