import { useState } from 'react';
import Header from '../components/Header';
import './MessagesPage.css';

interface Message {
  id: string;
  doctorName: string;
  specialty: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar: string;
}

interface ChatMessage {
  id: string;
  sender: 'doctor' | 'patient';
  message: string;
  timestamp: string;
}

const MessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState<string>('1');
  const [messageText, setMessageText] = useState('');

  const conversations: Message[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      lastMessage: 'Your test results look good. Let\'s schedule a follow-up.',
      timestamp: '2 min ago',
      unread: true,
      avatar: 'SJ'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Primary Care',
      lastMessage: 'Please remember to take your medication twice daily.',
      timestamp: '1 hour ago',
      unread: true,
      avatar: 'MC'
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      lastMessage: 'The prescription has been sent to your pharmacy.',
      timestamp: 'Yesterday',
      unread: false,
      avatar: 'ER'
    },
    {
      id: '4',
      doctorName: 'Dr. James Wilson',
      specialty: 'Orthopedic',
      lastMessage: 'Your X-ray shows good progress. Keep up with physical therapy.',
      timestamp: '2 days ago',
      unread: false,
      avatar: 'JW'
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      sender: 'doctor',
      message: 'Hello! I\'ve reviewed your recent blood work and everything looks good.',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      sender: 'patient',
      message: 'That\'s great to hear! Should I continue with the same medication?',
      timestamp: '10:32 AM'
    },
    {
      id: '3',
      sender: 'doctor',
      message: 'Yes, please continue with your current dosage. Your cholesterol levels have improved significantly.',
      timestamp: '10:35 AM'
    },
    {
      id: '4',
      sender: 'patient',
      message: 'Wonderful! When should I schedule my next appointment?',
      timestamp: '10:36 AM'
    },
    {
      id: '5',
      sender: 'doctor',
      message: 'Let\'s schedule a follow-up in 3 months. You can book through the appointments section.',
      timestamp: '10:38 AM'
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedMessage);

  return (
    <div className="messages-page">
      <Header />
      <div className="main-layout">
        {/* Left Sidebar - Conversations List */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Messages</h2>
            <button className="new-message-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>

          <div className="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search messages..." />
          </div>

          <div className="conversations-list">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`conversation-item ${selectedMessage === conv.id ? 'active' : ''}`}
                onClick={() => setSelectedMessage(conv.id)}
              >
                <div className="conversation-avatar">{conv.avatar}</div>
                <div className="conversation-info">
                  <div className="conversation-header">
                    <h4>{conv.doctorName}</h4>
                    <span className="conversation-time">{conv.timestamp}</span>
                  </div>
                  <p className="conversation-specialty">{conv.specialty}</p>
                  <p className="conversation-preview">{conv.lastMessage}</p>
                </div>
                {conv.unread && <div className="unread-badge"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="main-content-area">
          {selectedConversation ? (
            <div className="chat-container">
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="chat-avatar">{selectedConversation.avatar}</div>
                  <div>
                    <h3>{selectedConversation.doctorName}</h3>
                    <p>{selectedConversation.specialty}</p>
                  </div>
                </div>
                <button className="more-options-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>
              </div>

              <div className="chat-messages">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.sender}`}>
                    <div className="message-bubble">
                      <p>{msg.message}</p>
                      <span className="message-time">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="chat-input-area">
                <button className="attach-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="send-btn" onClick={handleSendMessage}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <h3>Select a conversation</h3>
              <p>Choose a conversation from the list to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;