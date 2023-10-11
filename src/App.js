import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import Login from './components/Login';
import FriendsList from './components/FriendsList'
import LogOut from './components/Logout';
import AddFriends from './components/AddFriends';

function App() {
  return (
    <div className="App">
      <h2>Friends Database</h2>
      <nav className='nav-panel'>
        <Link to='/login'>Log in</Link>
        <Link to='/friends'>friends</Link>
        <Link to='/friends/add'>Add friends</Link>
        <Link to='/logout'>Log Out</Link>
      </nav>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path='friends' element={<FriendsList />} />
        <Route path='friends/add' element={<AddFriends />} />
        <Route path='logout' element={<LogOut />} />
      </Routes>
    </div>
  );
}

export default App;
