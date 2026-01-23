import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import NewsPage from './components/NewsPage';
import DonatePage from './components/Donate.jsx';
import JoinPage from './components/JoinPage.jsx';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-white">
                <Header />
                <Routes>

                    <Route path="/" element={<Hero />} />
                    <Route path="/join" element={<JoinPage />} />

                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/donate" element={<DonatePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;