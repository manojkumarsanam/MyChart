import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
// import './ScheduleAppointmentPage.css';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  available: boolean;
  nextAvailable: string;
  rating: number;
  image: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const ScheduleAppointmentPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [searchType, setSearchType] = useState<'specialty' | 'doctor'>('specialty');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  const specialties = [
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Family Medicine',
    'Gastroenterology',
    'Neurology',
    'Obstetrics & Gynecology',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Urology'
  ];

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      available: true,
      nextAvailable: 'Nov 15, 2025',
      rating: 4.8,
      image: 'SJ'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Family Medicine',
      available: true,
      nextAvailable: 'Nov 10, 2025',
      rating: 4.9,
      image: 'MC'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      available: true,
      nextAvailable: 'Nov 12, 2025',
      rating: 4.7,
      image: 'ER'
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      available: true,
      nextAvailable: 'Nov 18, 2025',
      rating: 4.6,
      image: 'JW'
    }
  ];

  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '11:30 AM', available: false },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '03:30 PM', available: false },
    { time: '04:00 PM', available: true },
    { time: '04:30 PM', available: true }
  ];

  const filteredDoctors = selectedSpecialty
    ? doctors.filter(d => d.specialty === selectedSpecialty)
    : doctors;

  const handleNext = () => {
    if (step < 3) setStep((step + 1) as 2 | 3);
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as 1 | 2);
  };

  const handleSubmit = () => {
    console.log('Appointment scheduled:', {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      reason
    });
    navigate('/appointments');
  };

  return (
    <div className="schedule-appointment-page">
      <Header />
      <div className="schedule-container">
        <div className="schedule-header">
          <button className="back-to-appointments" onClick={() => navigate('/appointments')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Appointments
          </button>
          <h1>Schedule New Appointment</h1>
          <div className="progress-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Select Doctor</span>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Choose Time</span>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Confirm</span>
            </div>
          </div>
        </div>

        {/* Step 1: Select Doctor */}
        {step === 1 && (
          <div className="step-content">
            <div className="search-type-toggle">
              <button
                className={searchType === 'specialty' ? 'active' : ''}
                onClick={() => setSearchType('specialty')}
              >
                Search by Specialty
              </button>
              <button
                className={searchType === 'doctor' ? 'active' : ''}
                onClick={() => setSearchType('doctor')}
              >
                Search by Doctor
              </button>
            </div>

            {searchType === 'specialty' && (
              <div className="specialty-grid">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    className={`specialty-card ${selectedSpecialty === specialty ? 'selected' : ''}`}
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    <span>{specialty}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="doctors-list">
              <h3>{selectedSpecialty ? `${selectedSpecialty} Doctors` : 'Available Doctors'}</h3>
              <div className="doctors-grid">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`doctor-card ${selectedDoctor === doctor.id ? 'selected' : ''}`}
                    onClick={() => setSelectedDoctor(doctor.id)}
                  >
                    <div className="doctor-avatar">{doctor.image}</div>
                    <div className="doctor-info">
                      <h4>{doctor.name}</h4>
                      <p>{doctor.specialty}</p>
                      <div className="doctor-meta">
                        <span className="rating">
                          ⭐ {doctor.rating}
                        </span>
                        <span className="next-available">Next: {doctor.nextAvailable}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="step-actions">
              <button
                className="btn-primary"
                onClick={handleNext}
                disabled={!selectedDoctor}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Time */}
        {step === 2 && (
          <div className="step-content">
            <div className="date-picker-section">
              <h3>Select Date</h3>
              <input
                type="date"
                className="date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {selectedDate && (
              <div className="time-slots-section">
                <h3>Available Time Slots</h3>
                <div className="time-slots-grid">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBack}>
                Back
              </button>
              <button
                className="btn-primary"
                onClick={handleNext}
                disabled={!selectedDate || !selectedTime}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="step-content">
            <div className="confirmation-summary">
              <h3>Appointment Summary</h3>
              <div className="summary-card">
                <div className="summary-item">
                  <span className="label">Doctor</span>
                  <span className="value">{doctors.find(d => d.id === selectedDoctor)?.name}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Specialty</span>
                  <span className="value">{doctors.find(d => d.id === selectedDoctor)?.specialty}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Date</span>
                  <span className="value">{selectedDate}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Time</span>
                  <span className="value">{selectedTime}</span>
                </div>
              </div>
            </div>

            <div className="reason-section">
              <h3>Reason for Visit (Optional)</h3>
              <textarea
                className="reason-input"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe the reason for your visit..."
                rows={4}
              />
            </div>

            <div className="step-actions">
              <button className="btn-secondary" onClick={handleBack}>
                Back
              </button>
              <button className="btn-primary" onClick={handleSubmit}>
                Confirm Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleAppointmentPage;