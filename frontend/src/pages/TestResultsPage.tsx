import { useState } from 'react';
import Header from '../components/Header';
// import './TestResultsPage.css';

interface TestResult {
  id: string;
  testName: string;
  date: string;
  orderedBy: string;
  status: 'normal' | 'abnormal' | 'pending';
  category: string;
  results: {
    parameter: string;
    value: string;
    range: string;
    status: 'normal' | 'high' | 'low';
  }[];
  notes?: string;
}

const TestResultsPage = () => {
  const [selectedTest, setSelectedTest] = useState<string>('1');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const testResults: TestResult[] = [
    {
      id: '1',
      testName: 'Complete Blood Count (CBC)',
      date: 'Oct 25, 2025',
      orderedBy: 'Dr. Sarah Johnson',
      status: 'normal',
      category: 'Blood Work',
      results: [
        { parameter: 'White Blood Cells', value: '7.5', range: '4.5-11.0 K/uL', status: 'normal' },
        { parameter: 'Red Blood Cells', value: '5.1', range: '4.5-5.9 M/uL', status: 'normal' },
        { parameter: 'Hemoglobin', value: '15.2', range: '13.5-17.5 g/dL', status: 'normal' },
        { parameter: 'Platelets', value: '250', range: '150-400 K/uL', status: 'normal' }
      ],
      notes: 'All blood count parameters within normal range. Continue current treatment.'
    },
    {
      id: '2',
      testName: 'Lipid Panel',
      date: 'Oct 20, 2025',
      orderedBy: 'Dr. Sarah Johnson',
      status: 'abnormal',
      category: 'Blood Work',
      results: [
        { parameter: 'Total Cholesterol', value: '210', range: '<200 mg/dL', status: 'high' },
        { parameter: 'LDL Cholesterol', value: '140', range: '<100 mg/dL', status: 'high' },
        { parameter: 'HDL Cholesterol', value: '45', range: '>40 mg/dL', status: 'normal' },
        { parameter: 'Triglycerides', value: '125', range: '<150 mg/dL', status: 'normal' }
      ],
      notes: 'Elevated cholesterol levels. Continue statin therapy and dietary modifications.'
    },
    {
      id: '3',
      testName: 'Thyroid Function (TSH)',
      date: 'Oct 15, 2025',
      orderedBy: 'Dr. Michael Chen',
      status: 'normal',
      category: 'Hormone',
      results: [
        { parameter: 'TSH', value: '2.1', range: '0.4-4.0 mIU/L', status: 'normal' },
        { parameter: 'Free T4', value: '1.3', range: '0.9-1.7 ng/dL', status: 'normal' }
      ]
    },
    {
      id: '4',
      testName: 'Chest X-Ray',
      date: 'Oct 10, 2025',
      orderedBy: 'Dr. Michael Chen',
      status: 'normal',
      category: 'Imaging',
      results: [
        { parameter: 'Findings', value: 'Clear lung fields', range: 'N/A', status: 'normal' },
        { parameter: 'Heart Size', value: 'Normal', range: 'N/A', status: 'normal' }
      ],
      notes: 'No acute cardiopulmonary abnormalities detected.'
    },
    {
      id: '5',
      testName: 'Urinalysis',
      date: 'Oct 5, 2025',
      orderedBy: 'Dr. Michael Chen',
      status: 'normal',
      category: 'Urinalysis',
      results: [
        { parameter: 'Color', value: 'Yellow', range: 'Yellow', status: 'normal' },
        { parameter: 'pH', value: '6.0', range: '4.5-8.0', status: 'normal' },
        { parameter: 'Protein', value: 'Negative', range: 'Negative', status: 'normal' },
        { parameter: 'Glucose', value: 'Negative', range: 'Negative', status: 'normal' }
      ]
    }
  ];

  const categories = ['all', ...Array.from(new Set(testResults.map(t => t.category)))];
  const filteredTests = filterCategory === 'all' 
    ? testResults 
    : testResults.filter(t => t.category === filterCategory);

  const selectedTestData = testResults.find(t => t.id === selectedTest);

  return (
    <div className="test-results-page">
      <Header />
      <div className="main-layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Test Results</h2>
            <button className="download-all-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </button>
          </div>

          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-chip ${filterCategory === category ? 'active' : ''}`}
                onClick={() => setFilterCategory(category)}
              >
                {category === 'all' ? 'All Tests' : category}
              </button>
            ))}
          </div>

          <div className="test-results-list">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className={`test-item ${selectedTest === test.id ? 'active' : ''}`}
                onClick={() => setSelectedTest(test.id)}
              >
                <div className={`test-status-badge ${test.status}`}>
                  {test.status === 'normal' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {test.status === 'abnormal' && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  )}
                </div>
                <div className="test-info">
                  <h4>{test.testName}</h4>
                  <p className="test-date">{test.date}</p>
                  <p className="test-doctor">{test.orderedBy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content-area">
          {selectedTestData ? (
            <div className="test-details">
              <div className="details-header">
                <div>
                  <h2>{selectedTestData.testName}</h2>
                  <div className="test-meta">
                    <span className={`status-badge ${selectedTestData.status}`}>
                      {selectedTestData.status.toUpperCase()}
                    </span>
                    <span className="test-date-large">{selectedTestData.date}</span>
                  </div>
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
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
                    </svg>
                    Share
                  </button>
                </div>
              </div>

              <div className="test-info-cards">
                <div className="info-card-small">
                  <h5>Ordered By</h5>
                  <p>{selectedTestData.orderedBy}</p>
                </div>
                <div className="info-card-small">
                  <h5>Category</h5>
                  <p>{selectedTestData.category}</p>
                </div>
              </div>

              <div className="results-table-container">
                <h3>Test Results</h3>
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Value</th>
                      <th>Reference Range</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTestData.results.map((result, index) => (
                      <tr key={index}>
                        <td className="parameter-name">{result.parameter}</td>
                        <td className="value">{result.value}</td>
                        <td className="range">{result.range}</td>
                        <td>
                          <span className={`result-status ${result.status}`}>
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedTestData.notes && (
                <div className="notes-section">
                  <h3>Doctor's Notes</h3>
                  <div className="notes-box">
                    <p>{selectedTestData.notes}</p>
                  </div>
                </div>
              )}

              <div className="action-buttons">
                <button className="action-btn primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  Message Doctor
                </button>
                <button className="action-btn secondary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Schedule Follow-up
                </button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <h3>Select a test result</h3>
              <p>Choose a test to view detailed results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestResultsPage;