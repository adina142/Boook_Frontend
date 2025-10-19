import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProcessBuilder from '../ProcessBuilder/ProcessBuilder';
import ProcessTemplates from '../ProcessTemplates/ProcessTemplates';
import ProcessRecommendations from '../ProcessRecommendations/ProcessRecommendations';
import './Process.css';


const Process = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const location = useLocation();

  const tabs = [
    { id: 'builder', label: 'Process Builder', icon: '🛠️', path: '/process/builder' },
    { id: 'templates', label: 'Templates', icon: '📋', path: '/process/templates' },
    { id: 'recommendations', label: 'AI Recommendations', icon: '🤖', path: '/process/recommendations' }
  ];

  useEffect(() => {
    // Set active tab based on current route
    const currentTab = tabs.find(tab => location.pathname === tab.path);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [location.pathname]);

  return (
    <div className="process-container">
      {/* Header */}
      <div className="process-header">
        <div className="header-content">
          <h1 className="process-title">
            <span className="process-icon">🔧</span>
            Project Process Management
          </h1>
          <p className="process-subtitle">
            Design, customize, and optimize project processes based on PM standards
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="process-tabs">
          {tabs.map(tab => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`process-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="process-content">
        <Routes>
          <Route path="builder" element={<ProcessBuilder />} />
          <Route path="templates" element={<ProcessTemplates />} />
          <Route path="recommendations" element={<ProcessRecommendations />} />
          <Route path="/" element={<ProcessBuilder />} />
        </Routes>
      </div>
    </div>
  );
};

export default Process;

