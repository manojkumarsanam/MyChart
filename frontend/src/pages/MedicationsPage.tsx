import { useState } from 'react';
import Header from '../components/Header';
import './MedicationsPage.css';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
  endDate?: string;
  instructions: string;
  refillsRemaining: number;
  status: 'active' | 'inactive';
}

const MedicationsPage = () => {
  const [selectedMed, setSelectedMed] = useState<string>('1');

  const medications: Medication[] = [
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: 'Jan 15, 2025',
      instructions: 'Take in the morning with water. Do not take with potassium supplements.',
      refillsRemaining: 3,
      status: 'active'
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedBy: 'Dr. Michael Chen',
      startDate: 'Feb 10, 2025',
      instructions: 'Take with meals to reduce stomach upset.',
      refillsRemaining: 5,
      status: 'active'
    },
    {
      id: '3',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: 'Mar 5, 2025',
      instructions: 'Take at bedtime. Avoid grapefruit juice.',
      refillsRemaining: 2,
      status: 'active'
    },
    {
      id: '4',
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      prescribedBy: 'Dr. Emily Rodriguez',
      startDate: 'Sep 20, 2025',
      endDate: 'Oct 1, 2025',
      instructions: 'Complete full course even if feeling better.',
      refillsRemaining: 0,
      status: 'inactive'
    }
  ];

  const activeMeds = medications.filter(m => m.status === 'active');
  const inactiveMeds = medications.filter(m => m.status === 'inactive');
  const selectedMedication = medications.find(m => m.id === selectedMed);

  return (
    <div className="medications-page">
      <Header />
      <div className="main-layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Medications</h2>
            <button className="report-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Report Issue
            </button>
          </div>

          <div className="meds-stats">
            <div className="stat-card">
              <span className="stat-number">{activeMeds.length}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{inactiveMeds.length}</span>
              <span className="stat-label">Past</span>
            </div>
          </div>

          <div className="medications-list">
            <div className="meds-section">
              <h3>Active Medications</h3>
              {activeMeds.map((med) => (
                <div
                  key={med.id}
                  className={`medication-item ${selectedMed === med.id ? 'active' : ''}`}
                  onClick={() => setSelectedMed(med.id)}
                >
                  <div className="med-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    </svg>
                  </div>
                  <div className="med-info">
                    <h4>{med.name}</h4>
                    <p>{med.dosage} • {med.frequency}</p>
                    <span className="refills">{med.refillsRemaining} refills left</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="meds-section">
              <h3>Past Medications</h3>
              {inactiveMeds.map((med) => (
                <div
                  key={med.id}
                  className={`medication-item ${selectedMed === med.id ? 'active' : ''}`}
                  onClick={() => setSelectedMed(med.id)}
                >
                  <div className="med-icon inactive">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    </svg>
                  </div>
                  <div className="med-info">
                    <h4>{med.name}</h4>
                    <p>{med.dosage} • {med.frequency}</p>
                    <span className="completed">Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="main-content-area">
          {selectedMedication ? (
            <div className="medication-details">
              <div className="details-header">
                <div>
                  <h2>{selectedMedication.name}</h2>
                  <p className="med-dosage">{selectedMedication.dosage}</p>
                </div>
                {selectedMedication.status === 'active' && (
                  <button className="refill-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    Request Refill
                  </button>
                )}
              </div>

              <div className="med-details-grid">
                <div className="detail-card">
                  <h4>Frequency</h4>
                  <p>{selectedMedication.frequency}</p>
                </div>
                <div className="detail-card">
                  <h4>Prescribed By</h4>
                  <p>{selectedMedication.prescribedBy}</p>
                </div>
                <div className="detail-card">
                  <h4>Start Date</h4>
                  <p>{selectedMedication.startDate}</p>
                </div>
                <div className="detail-card">
                  <h4>Refills Remaining</h4>
                  <p>{selectedMedication.refillsRemaining}</p>
                </div>
              </div>

              <div className="instructions-box">
                <h4>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  Instructions
                </h4>
                <p>{selectedMedication.instructions}</p>
              </div>

              {selectedMedication.status === 'active' && (
                <div className="action-buttons">
                  <button className="action-btn secondary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Message Doctor
                  </button>
                  <button className="action-btn secondary">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Set Reminder
                  </button>
                  <button className="action-btn danger">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3l18 18M8.5 8.5L3 3m5.5 5.5l3 3M21 21L8.5 8.5M21 21l-3-3" />
                    </svg>
                    Report Side Effect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              </svg>
              <h3>Select a medication</h3>
              <p>Choose a medication to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationsPage;