import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import WorkerDetailsPage from './pages/WorkerDetailsPage';
import ListWorkPage from './pages/ListWorkPage';
import ProfilePage from './pages/ProfilePage';
import { FirebaseProvider } from './lib/FirebaseProvider';

export default function App() {
  return (
    <FirebaseProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/worker/:id" element={<WorkerDetailsPage />} />
            <Route path="/list-work" element={<ListWorkPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Layout>
      </Router>
    </FirebaseProvider>
  );
}
