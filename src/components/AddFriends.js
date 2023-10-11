import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../axiosAuth";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";

export default function AddFriends() {
    const initialValues = {
        name: '',
        email: '',
        age: '',
    }

    const [friends, setFriends] = useState(initialValues);
    const [error, setError] = useState(false);
    const [isFriendAdded, setIsFriendAdded] = useState(false);

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

    const onSubmit = (evt) => {
        evt.preventDefault();
        const token = localStorage.getItem('token');
        let number = Number(friends.age)
        axios.post('http://localhost:9000/api/friends', friends, {
           headers: {
            authorization: token
           } 
    })
            .then((res) => {
                setIsFriendAdded(true)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onChange = (evt) => {
        setFriends({
            ...friends,
            [evt.target.name]: evt.target.value,
        })
    }

    return (
        <div className="add-friend">
            <h1>Add A friend</h1>
            {isFriendAdded === true ? <h2>Friend added!</h2> : null}
            {error === true ?
                <div className="friends-list-error">
                    <h2>Error: Must login to add A friend</h2>
                    <Link to='/login'>Click to return to log in page</Link>
                </div>
                : <form onSubmit={onSubmit}>
                    <input type='text' placeholder="friend's name here" name="name" onChange={onChange} value={friends.name} />
                    <input type='email' placeholder="friend's email here" name="email" onChange={onChange} value={friends.email} />
                    <input type='text' placeholder="friend's age here" name="age" onChange={onChange} value={friends.age} />
                    <button type="submit">Log in</button>
                </form>
            }
        </div>
    )
}