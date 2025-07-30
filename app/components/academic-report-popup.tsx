'use client';

import { useState, useEffect, useRef } from 'react';

interface AcademicReportPopupProps {
  show: boolean;
  onClose: () => void;
  content: string;
}

export default function AcademicReportPopup({ show, onClose, content }: AcademicReportPopupProps) {
  const [showSendDropdown, setShowSendDropdown] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowSendDropdown(false);
      }
    }

    if (showSendDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSendDropdown]);

  // Function to handle sending report to parents
  const handleSendToParents = () => {
    // In a real app, this would trigger an API call to send the report
    alert('Report sent to parents successfully!');
    setShowSendDropdown(false);
  };

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={popupRef}>
        <div className="popup-header">
          <h2 className="popup-title">Academic Performance Report</h2>
          <div className="send-to-container" ref={popupRef}>
            <button 
              className="send-to-btn"
              onClick={() => setShowSendDropdown(!showSendDropdown)}
            >
              Send to ▼
            </button>
            {showSendDropdown && (
              <div className="send-dropdown">
                <button 
                  className="dropdown-item"
                  onClick={handleSendToParents}
                >
                  Parents
                </button>
              </div>
            )}
          </div>
          <button 
            className="popup-close" 
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="popup-body">
          <div className="report-content">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
