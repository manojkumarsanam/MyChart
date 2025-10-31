import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './AppointmentsPage.css';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'upcoming' | 'past';
  reason: string;
  location: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const AppointmentsPage = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<string>('1');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const navigate = useNavigate();

  const appointments: Appointment[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Nov 15, 2025',
      time: '10:00 AM',
      type: 'upcoming',
      reason: 'Annual Checkup',
      location: 'Main Hospital - Room 305',
      status: 'confirmed'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Primary Care',
      date: 'Nov 20, 2025',
      time: '2:30 PM',
      type: 'upcoming',
      reason: 'Follow-up Visit',
      location: 'Clinic Building - Room 102',
      status: 'confirmed'
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      date: 'Nov 25, 2025',
      time: '11:15 AM',
      type: 'upcoming',
      reason: 'Skin Consultation',
      location: 'Dermatology Center - Room 201',
      status: 'pending'
    },
    {
      id: '4',
      doctorName: 'Dr. James Wilson',
      specialty: 'Orthopedic',
      date: 'Oct 28, 2025',
      time: '9:00 AM',
      type: 'past',
      reason: 'Post-Surgery Follow-up',
      location: 'Main Hospital - Room 410',
      status: 'completed'
    },
    {
      id: '5',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Oct 15, 2025',
      time: '3:00 PM',
      type: 'past',
      reason: 'Blood Pressure Check',
      location: 'Main Hospital - Room 305',
      status: 'completed'
    }
  ];

  const upcomingAppointments = appointments.filter(a => a.type === 'upcoming');
  const pastAppointments = appointments.filter(a => a.type === 'past');
  const selectedAppt = appointments.find(a => a.id === selectedAppointment);

  return (
    <div className="appointments-page">
      <Header />
      <div className="main-layout">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Appointments</h2>
            <button className="schedule-btn" onClick={() => navigate('/appointments/schedule')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Schedule
            </button>
          </div>

          <div className="appointments-tabs">
            <button className="tab active">Upcoming</button>
            <button className="tab">Past</button>
          </div>

          <div className="appointments-list">
            <div className="appointments-section">
              <h3>Upcoming Appointments</h3>
              {upcomingAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className={`appointment-item ${selectedAppointment === appt.id ? 'active' : ''}`}
                  onClick={() => setSelectedAppointment(appt.id)}
                >
                  <div className="appointment-date-badge">
                    <span className="date-day">{appt.date.split(' ')[1].replace(',', '')}</span>
                    <span className="date-month">{appt.date.split(' ')[0]}</span>
                  </div>
                  <div className="appointment-info">
                    <h4>{appt.doctorName}</h4>
                    <p className="specialty">{appt.specialty}</p>
                    <p className="time">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {appt.time}
                    </p>
                  </div>
                  <div className={`status-badge ${appt.status}`}>
                    {appt.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="appointments-section">
              <h3>Past Appointments</h3>
              {pastAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className={`appointment-item ${selectedAppointment === appt.id ? 'active' : ''}`}
                  onClick={() => setSelectedAppointment(appt.id)}
                >
                  <div className="appointment-date-badge past">
                    <span className="date-day">{appt.date.split(' ')[1].replace(',', '')}</span>
                    <span className="date-month">{appt.date.split(' ')[0]}</span>
                  </div>
                  <div className="appointment-info">
                    <h4>{appt.doctorName}</h4>
                    <p className="specialty">{appt.specialty}</p>
                    <p className="time">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {appt.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Appointment Details */}
        <div className="main-content-area">
          {selectedAppt ? (
            <div className="appointment-details">
              <div className="details-header">
                <h2>Appointment Details</h2>
                <div className="details-actions">
                  {selectedAppt.type === 'upcoming' && (
                    <>
                      <button className="action-btn secondary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Reschedule
                      </button>
                      <button className="action-btn danger">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="details-content">
                <div className="detail-card">
                  <div className="detail-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h4>Doctor</h4>
                    <p>{selectedAppt.doctorName}</p>
                    <span className="detail-subtitle">{selectedAppt.specialty}</span>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <h4>Date & Time</h4>
                    <p>{selectedAppt.date}</p>
                    <span className="detail-subtitle">{selectedAppt.time}</span>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h4>Location</h4>
                    <p>{selectedAppt.location}</p>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="detail-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <h4>Reason for Visit</h4>
                    <p>{selectedAppt.reason}</p>
                  </div>
                </div>

                {selectedAppt.type === 'upcoming' && (
                  <div className="appointment-instructions">
                    <h4>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      Before Your Appointment
                    </h4>
                    <ul>
                      <li>Arrive 15 minutes early for check-in</li>
                      <li>Bring your insurance card and ID</li>
                      <li>List current medications you're taking</li>
                      <li>Prepare any questions you have for the doctor</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <h3>Select an appointment</h3>
              <p>Choose an appointment to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;