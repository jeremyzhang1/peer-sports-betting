import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Landing'
import BettingPage from './BettingPage'
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/app" element={
                    <BettingPage />
                } />
                <Route path="/" element={
                    <Landing />
                } />
            </Routes>
        </Router>
    );
}

export default App;
