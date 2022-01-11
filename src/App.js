import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePost from './views/HomePost';
import Post from './views/Post';
import './App.css';
import './scss/scrollbar.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePost />} />
        <Route path="/:slug" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
