import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../axiosAuth";
import { Link, Route, Routes } from "react-router-dom";

export default function FriendsList() {
    const [friends, setFriends] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axiosWithAuth().get('http://localhost:9000/api/friends')
        .then((res) => {
            console.log(res.data);
            setFriends(res.data);
            setError(false);
        })
        .catch((err) => {
            setError(true);
        })
    }, [])

    return (
        <div className="friends-list">
        <h1>Friends list</h1>
        {error === true ? 
        <div className="friends-list-error">
        <h2>Error: Must login to see your friendslist</h2>
            <Link to='/login'>Click to return to log in page</Link>
         </div>
         : 
         <div className="friends">
            {
            friends.map((friend) => {
                return (
                    <li key={friend.id} style={{paddingBottom: '1.5rem'}}>Name: {friend.name} Email: {friend.email} Age: {friend.age}</li>
                )
            })
            }
        </div>
         }
        </div>
        
    )
}