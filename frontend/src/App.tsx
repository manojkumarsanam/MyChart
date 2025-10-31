import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import HomePage from './pages/HomePage';
import MessagesPage from './pages/MessagesPage';
import AppointmentsPage from './pages/AppointmentsPage';
import ScheduleAppointmentPage from './pages/ScheduleAppointmentPage';
import MedicationsPage from './pages/MedicationsPage';
import VisitsPage from './pages/VisitsPage';
import TestResultsPage from './pages/TestResultsPage';
import BillingPage from './pages/BillingPage';
// import AccountSettingsPage from './pages/AccountSettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/appointments/schedule" element={<ScheduleAppointmentPage />} />
        <Route path="/medications" element={<MedicationsPage />} />
        <Route path="/visits" element={<VisitsPage />} />
        <Route path="/test-results" element={<TestResultsPage />} />
        <Route path="/billing" element={<BillingPage />} />
        {/* <Route path="/account-settings" element={<AccountSettingsPage />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;