import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePost from './views/HomePost';
import Post from './views/Post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePost />} />
        <Route path="/Post" element={<Post />} />
        {/* /:slug */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
