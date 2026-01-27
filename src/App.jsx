import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/ActionsMap.jsx';
import NewsPage from './components/NewsPage';
import DonatePage from './components/Donate.jsx';
import JoinPage from './components/JoinPage.jsx';
import Mission from './components/Mission.jsx';
import Purpose from './components/Purpose.jsx';
import Herosection from "./components/Herosection.jsx";
import ActionsMap from "./components/ActionsMap.jsx";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-white">
                <Header />
                <Routes>

                    <Route path="/" element={
                        <>
                            <Herosection />
                            <section id="actions">
                                <ActionsMap />
                            </section>
                            <Mission />
                            <section id="purpose">
                                <Purpose />
                            </section>

                        </>
                    } />

                    <Route path="/join" element={<JoinPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/donate" element={<DonatePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;