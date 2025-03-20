import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Set mounted state to trigger entrance animation
    setMounted(true);

    // Set active link based on current path
    const currentPath = location.pathname;
    if (currentPath.includes('application-form')) {
      setActiveLink('application-form');
    } else if (currentPath.includes('application-status')) {
      setActiveLink('application-status');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    // Add exit animation before logout
    setMounted(false);
    
    // Wait for animation to complete
    setTimeout(() => {
      localStorage.removeItem('user');
      navigate('/');
    }, 500);
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${mounted ? 'sidebar-mounted' : ''} ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Dashboard</h2>
        <button className="toggle-btn" onClick={toggleSidebar} aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}>
          {isExpanded ? (
            // Left arrow when expanded (to collapse)
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          ) : (
            // Right arrow when collapsed (to expand)
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          )}
        </button>
      </div>

      <div className="sidebar-content">
        <Link 
          to="/dashboard/application-form" 
          className={`nav-link ${activeLink === 'application-form' ? 'active' : ''}`}
          style={{ animationDelay: '0.1s' }}
        >
          <div className="link-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4 0h5.5v1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h1V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
              <path d="M9.5 3V0L14 4.5h-3A1.5 1.5 0 0 1 9.5 3z"/>
            </svg>
          </div>
          <span className="link-text">Application Form</span>
          {activeLink === 'application-form' && <div className="active-indicator"></div>}
        </Link>

        <Link 
          to="/dashboard/application-status" 
          className={`nav-link ${activeLink === 'application-status' ? 'active' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="link-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </div>
          <span className="link-text">Application Status</span>
          {activeLink === 'application-status' && <div className="active-indicator"></div>}
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="logout-btn"
        style={{ animationDelay: '0.3s' }}
      >
        <div className="link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
        </div>
        <span className="link-text">Logout</span>
      </button>
    </div>
  );
}