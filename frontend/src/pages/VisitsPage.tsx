import { useState } from 'react';
import Header from '../components/Header';
// import './VisitsPage.css';

interface Visit {
  id: string;
  date: string;
  doctorName: string;
  specialty: string;
  reason: string;
  diagnosis: string;
  prescriptions: string[];
  notes: string;
  followUp?: string;
  documents: string[];
}

const VisitsPage = () => {
  const [selectedVisit, setSelectedVisit] = useState<string>('1');

  const visits: Visit[] = [
    {
      id: '1',
      date: 'Oct 28, 2025',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      reason: 'Annual Cardiac Checkup',
      diagnosis: 'Blood pressure within normal range. EKG shows normal rhythm.',
      prescriptions: ['Lisinopril 10mg - Continue', 'Atorvastatin 20mg - Continue'],
      notes: 'Patient reports feeling well. No chest pain or shortness of breath. Continue current medications. Maintain healthy diet and exercise routine.',
      followUp: 'Schedule follow-up in 6 months',
      documents: ['EKG Report', 'Blood Test Results', 'Blood Pressure Log']
    },
    {
      id: '2',
      date: 'Oct 15, 2025',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Primary Care',
      reason: 'Flu-like Symptoms',
      diagnosis: 'Viral upper respiratory infection',
      prescriptions: ['Ibuprofen 400mg as needed', 'Rest and hydration'],
      notes: 'Patient presented with cough, fever, and body aches. Lungs clear on auscultation. Advised rest, fluids, and over-the-counter symptom management.',
      documents: ['Chest X-Ray', 'Lab Results']
    },
    {
      id: '3',
      date: 'Sep 20, 2025',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      reason: 'Skin Rash Consultation',
      diagnosis: 'Contact dermatitis',
      prescriptions: ['Hydrocortisone cream 1%', 'Antihistamine for itching'],
      notes: 'Rash on forearm likely due to allergic reaction. Prescribed topical steroid. Advised to avoid suspected allergens. Follow up if no improvement in 2 weeks.',
      followUp: 'Follow-up if symptoms persist after 2 weeks',
      documents: ['Dermatology Photos', 'Allergy Test Results']
    },
    {
      id: '4',
      date: 'Aug 10, 2025',
      doctorName: 'Dr. James Wilson',
      specialty: 'Orthopedic',
      reason: 'Knee Pain Follow-up',
      diagnosis: 'Post-surgical recovery progressing well',
      prescriptions: ['Physical therapy 3x per week', 'Continue pain management as needed'],
      notes: 'Patient recovering well from knee arthroscopy. Range of motion improving. Continue physical therapy regimen. Cleared for light activities.',
      followUp: 'Follow-up in 4 weeks',
      documents: ['X-Ray', 'Physical Therapy Plan', 'Surgical Notes']
    }
  ];

  const selectedVisitData = visits.find(v => v.id === selectedVisit);

  return (
    <div className="visits-page">
      <Header />
      <div className="main-layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Visit History</h2>
            <button className="filter-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
          </div>

          <div className="visits-stats">
            <div className="stat-card">
              <span className="stat-number">{visits.length}</span>
              <span className="stat-label">Total Visits</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">4</span>
              <span className="stat-label">This Year</span>
            </div>
          </div>

          <div className="visits-list">
            {visits.map((visit) => (
              <div
                key={visit.id}
                className={`visit-item ${selectedVisit === visit.id ? 'active' : ''}`}
                onClick={() => setSelectedVisit(visit.id)}
              >
                <div className="visit-date-badge">
                  <span className="date-day">{visit.date.split(' ')[1].replace(',', '')}</span>
                  <span className="date-month">{visit.date.split(' ')[0]}</span>
                </div>
                <div className="visit-info">
                  <h4>{visit.doctorName}</h4>
                  <p className="specialty">{visit.specialty}</p>
                  <p className="reason">{visit.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content-area">
          {selectedVisitData ? (
            <div className="visit-details">
              <div className="details-header">
                <div>
                  <h2>Visit Details</h2>
                  <p className="visit-date">{selectedVisitData.date}</p>
                </div>
                <div className="details-actions">
                  <button className="action-btn secondary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Download
                  </button>
                  <button className="action-btn secondary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 6 2 18 2 18 9" />
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                      <rect x="6" y="14" width="12" height="8" />
                    </svg>
                    Print
                  </button>
                </div>
              </div>

              <div className="visit-info-grid">
                <div className="info-card">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h4>Doctor</h4>
                    <p>{selectedVisitData.doctorName}</p>
                    <span>{selectedVisitData.specialty}</span>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <h4>Reason for Visit</h4>
                    <p>{selectedVisitData.reason}</p>
                  </div>
                </div>
              </div>

              <div className="section">
                <h3>Diagnosis</h3>
                <div className="content-box">
                  <p>{selectedVisitData.diagnosis}</p>
                </div>
              </div>

              <div className="section">
                <h3>Prescriptions</h3>
                <div className="prescriptions-list">
                  {selectedVisitData.prescriptions.map((prescription, index) => (
                    <div key={index} className="prescription-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                      </svg>
                      <span>{prescription}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section">
                <h3>Doctor's Notes</h3>
                <div className="content-box">
                  <p>{selectedVisitData.notes}</p>
                </div>
              </div>

              {selectedVisitData.followUp && (
                <div className="section">
                  <h3>Follow-up</h3>
                  <div className="follow-up-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <p>{selectedVisitData.followUp}</p>
                  </div>
                </div>
              )}

              <div className="section">
                <h3>Documents</h3>
                <div className="documents-grid">
                  {selectedVisitData.documents.map((doc, index) => (
                    <div key={index} className="document-card">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <h3>Select a visit</h3>
              <p>Choose a visit to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitsPage;