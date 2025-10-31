import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
// import './BillingPage.css';

interface Bill {
  id: string;
  date: string;
  description: string;
  provider: string;
  totalAmount: number;
  insuranceCovered: number;
  patientResponsibility: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate?: string;
}

const BillingPage = () => {
  const [selectedBill, setSelectedBill] = useState<string>('1');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  const bills: Bill[] = [
    {
      id: '1',
      date: 'Oct 28, 2025',
      description: 'Annual Physical Examination',
      provider: 'Dr. Sarah Johnson - Cardiology',
      totalAmount: 450.00,
      insuranceCovered: 360.00,
      patientResponsibility: 90.00,
      status: 'pending',
      dueDate: 'Nov 28, 2025'
    },
    {
      id: '2',
      date: 'Oct 15, 2025',
      description: 'Blood Work - Complete Panel',
      provider: 'Main Hospital Laboratory',
      totalAmount: 280.00,
      insuranceCovered: 252.00,
      patientResponsibility: 28.00,
      status: 'paid'
    },
    {
      id: '3',
      date: 'Sep 20, 2025',
      description: 'Dermatology Consultation',
      provider: 'Dr. Emily Rodriguez',
      totalAmount: 200.00,
      insuranceCovered: 160.00,
      patientResponsibility: 40.00,
      status: 'paid'
    },
    {
      id: '4',
      date: 'Aug 30, 2025',
      description: 'X-Ray Imaging - Chest',
      provider: 'Radiology Department',
      totalAmount: 350.00,
      insuranceCovered: 280.00,
      patientResponsibility: 70.00,
      status: 'overdue',
      dueDate: 'Sep 30, 2025'
    }
  ];

  const totalPending = bills
    .filter(b => b.status === 'pending')
    .reduce((sum, b) => sum + b.patientResponsibility, 0);

  const totalOverdue = bills
    .filter(b => b.status === 'overdue')
    .reduce((sum, b) => sum + b.patientResponsibility, 0);

  const selectedBillData = bills.find(b => b.id === selectedBill);

  const handlePayNow = () => {
    setShowPaymentModal(true);
  };

  return (
    <div className="billing-page">
      <Header />
      <div className="main-layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Billing</h2>
          </div>

          <div className="billing-stats">
            <div className="stat-card">
              <span className="stat-number">${totalPending.toFixed(2)}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card warning">
              <span className="stat-number">${totalOverdue.toFixed(2)}</span>
              <span className="stat-label">Overdue</span>
            </div>
          </div>

          <div className="bills-list">
            {bills.map((bill) => (
              <div
                key={bill.id}
                className={`bill-item ${selectedBill === bill.id ? 'active' : ''}`}
                onClick={() => setSelectedBill(bill.id)}
              >
                <div className={`bill-status-icon ${bill.status}`}>
                  {bill.status === 'paid' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {bill.status === 'pending' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  )}
                  {bill.status === 'overdue' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  )}
                </div>
                <div className="bill-info">
                  <h4>{bill.description}</h4>
                  <p className="bill-date">{bill.date}</p>
                  <p className="bill-amount">${bill.patientResponsibility.toFixed(2)}</p>
                </div>
                <span className={`status-label ${bill.status}`}>{bill.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content-area">
          {selectedBillData ? (
            <div className="bill-details">
              <div className="details-header">
                <div>
                  <h2>Bill Details</h2>
                  <p className="bill-number">Invoice #{selectedBillData.id.padStart(6, '0')}</p>
                </div>
                {selectedBillData.status !== 'paid' && (
                  <button className="pay-now-btn" onClick={handlePayNow}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    Pay Now
                  </button>
                )}
              </div>

              <div className="bill-summary-card">
                <div className="summary-row">
                  <span>Service</span>
                  <span className="value">{selectedBillData.description}</span>
                </div>
                <div className="summary-row">
                  <span>Provider</span>
                  <span className="value">{selectedBillData.provider}</span>
                </div>
                <div className="summary-row">
                  <span>Date of Service</span>
                  <span className="value">{selectedBillData.date}</span>
                </div>
                {selectedBillData.dueDate && (
                  <div className="summary-row">
                    <span>Due Date</span>
                    <span className={`value ${selectedBillData.status === 'overdue' ? 'overdue' : ''}`}>
                      {selectedBillData.dueDate}
                    </span>
                  </div>
                )}
              </div>

              <div className="charges-breakdown">
                <h3>Charges Breakdown</h3>
                <div className="breakdown-table">
                  <div className="breakdown-row">
                    <span>Total Charges</span>
                    <span className="amount">${selectedBillData.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row insurance">
                    <span>Insurance Covered</span>
                    <span className="amount">-${selectedBillData.insuranceCovered.toFixed(2)}</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Your Responsibility</span>
                    <span className="amount">${selectedBillData.patientResponsibility.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="insurance-info">
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Insurance Information
                </h3>
                <div className="insurance-details">
                  <div className="insurance-item">
                    <h5>Primary Insurance</h5>
                    <p>Blue Cross Blue Shield</p>
                  </div>
                  <div className="insurance-item">
                    <h5>Policy Number</h5>
                    <p>BCBS-123456789</p>
                  </div>
                  <div className="insurance-item">
                    <h5>Coverage</h5>
                    <p>80% after deductible</p>
                  </div>
                </div>
              </div>

              {selectedBillData.status !== 'paid' && (
                <div className="payment-options">
                  <h3>Payment Options</h3>
                  <div className="payment-methods">
                    <button className="payment-method-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                      Credit/Debit Card
                    </button>
                    <button className="payment-method-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      Bank Account
                    </button>
                    <button className="payment-method-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      Payment Plan
                    </button>
                  </div>
                </div>
              )}

              {selectedBillData.status === 'paid' && (
                <div className="paid-notice">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <h4>Payment Received</h4>
                    <p>This bill has been paid in full. Thank you!</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="no-selection">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <h3>Select a bill</h3>
              <p>Choose a bill to view details and make payments</p>
            </div>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Complete Payment</h3>
              <button className="close-btn" onClick={() => setShowPaymentModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="payment-amount">
                <h4>Amount Due</h4>
                <p className="amount-large">${selectedBillData?.patientResponsibility.toFixed(2)}</p>
              </div>
              <div className="payment-form">
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <button className="submit-payment-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Complete Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;