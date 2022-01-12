import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePost from './views/HomePost';
import Post from './views/Post';
import Author from './views/Author';
import NavHeader from './components/NavHeader';
import Footer from './components/Footer';
import SocialMedia from './components/SocialMedia';
import './App.css';
import './scss/scrollbar.scss';

function App() {
  return (
    <BrowserRouter>
      <NavHeader />
      <Routes>
        <Route path="/" element={<HomePost />} />
        <Route path="/:slug" element={<Post />} />
        <Route path="/Author" element={<Author />} />
      </Routes>
      <Footer />
      <SocialMedia />
    </BrowserRouter>
  );
}

export default App;
