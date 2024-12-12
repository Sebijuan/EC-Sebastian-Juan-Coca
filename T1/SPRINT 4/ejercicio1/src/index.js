import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import GuildMemberManagement from './components/GuildMemberManagement/GuildMemberManagement'
import PartyFinder from './components/PartyFinder/PartyFinder';
import AppHeader from '../src/components/general/AppHeader/AppHeader';
import AppFooter from '../src/components/general/AppFooter/AppFooter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<GuildMemberManagement />} />
        <Route path="/GuildMemberManagement" element={<GuildMemberManagement />} />
        <Route path="/PartyFinder" element={<PartyFinder />} />
      </Routes>
      <AppFooter />
    </Router>
  </React.StrictMode>
);
