import React, { useState, useEffect } from 'react';
import './ProcessBuilder.css';

const ProcessBuilder = () => {
  const [selectedScenario, setSelectedScenario] = useState('');
  const [customizations, setCustomizations] = useState({});
  const [generatedProcess, setGeneratedProcess] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const scenarios = [
    {
      id: 'software-dev',
      title: 'Custom Software Development',
      description: 'Well-defined requirements, <6 months, <7 team members',
      icon: '💻',
      color: '#48bb78'
    },
    {
      id: 'innovative-product',
      title: 'Innovative Product Development',
      description: 'R&D-heavy, uncertain outcomes, ~1 year duration',
      icon: '🚀',
      color: '#ed8936'
    },
    {
      id: 'government-project',
      title: 'Large Government Project',
      description: 'Civil, electrical, and IT components, 2-year duration',
      icon: '🏛️',
      color: '#667eea'
    }
  ];

  const customizationOptions = {
    'software-dev': [
      { id: 'sprint-length', label: 'Sprint Length', type: 'select', options: ['1 week', '2 weeks', '3 weeks', '4 weeks'] },
      { id: 'ceremonies', label: 'Agile Ceremonies', type: 'multi', options: ['Daily Standup', 'Sprint Planning', 'Sprint Review', 'Retrospective'] },
      { id: 'documentation', label: 'Documentation Level', type: 'select', options: ['Minimal', 'Balanced', 'Comprehensive'] }
    ],
    'innovative-product': [
      { id: 'discovery-phase', label: 'Discovery Phase Length', type: 'select', options: ['2 weeks', '4 weeks', '6 weeks', '8 weeks'] },
      { id: 'experiment-freq', label: 'Experiment Frequency', type: 'select', options: ['Weekly', 'Bi-weekly', 'Monthly'] },
      { id: 'risk-tolerance', label: 'Risk Tolerance', type: 'select', options: ['Low', 'Medium', 'High'] }
    ],
    'government-project': [
      { id: 'compliance-level', label: 'Compliance Requirements', type: 'multi', options: ['ISO 21502', 'PRINCE2', 'PMBOK', 'Government Standards'] },
      { id: 'reporting-freq', label: 'Reporting Frequency', type: 'select', options: ['Weekly', 'Bi-weekly', 'Monthly', 'Quarterly'] },
      { id: 'stakeholder-level', label: 'Stakeholder Involvement', type: 'select', options: ['Minimal', 'Moderate', 'High'] }
    ]
  };

  const handleScenarioSelect = (scenarioId) => {
    setSelectedScenario(scenarioId);
    setCustomizations({});
    setGeneratedProcess(null);
  };

  const handleCustomizationChange = (optionId, value) => {
    setCustomizations(prev => ({
      ...prev,
      [optionId]: value
    }));
  };

  const generateProcess = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const scenario = scenarios.find(s => s.id === selectedScenario);
    const process = {
      scenario: scenario.title,
      customizations,
      phases: generatePhases(scenario.id, customizations),
      standards: generateStandards(scenario.id),
      timeline: generateTimeline(scenario.id)
    };
    
    setGeneratedProcess(process);
    setIsGenerating(false);
  };

  const generatePhases = (scenarioId, customizations) => {
    const phaseTemplates = {
      'software-dev': [
        { name: 'Initiation', duration: '1-2 weeks', activities: ['Project Charter', 'Stakeholder Identification', 'High-level Scope'] },
        { name: 'Sprint Planning', duration: 'Ongoing', activities: ['Backlog Grooming', 'Sprint Planning', 'Capacity Planning'] },
        { name: 'Execution', duration: 'Multiple Sprints', activities: ['Daily Standups', 'Sprint Execution', 'Continuous Integration'] },
        { name: 'Review & Adaptation', duration: 'Per Sprint', activities: ['Sprint Review', 'Retrospective', 'Backlog Refinement'] },
        { name: 'Closure', duration: '1 week', activities: ['Final Delivery', 'Documentation', 'Lessons Learned'] }
      ],
      'innovative-product': [
        { name: 'Discovery', duration: '4-8 weeks', activities: ['Problem Validation', 'Market Research', 'Hypothesis Formation'] },
        { name: 'Feasibility', duration: '4-6 weeks', activities: ['MVP Development', 'User Testing', 'Technical Validation'] },
        { name: 'Build & Iterate', duration: '6-9 months', activities: ['Agile Development', 'Continuous Testing', 'Stakeholder Reviews'] },
        { name: 'Scale & Launch', duration: '2-3 months', activities: ['Market Launch', 'Scale Preparation', 'Operations Handover'] }
      ],
      'government-project': [
        { name: 'Pre-Initiation', duration: '2-4 weeks', activities: ['Feasibility Study', 'Business Case', 'Stakeholder Analysis'] },
        { name: 'Initiation', duration: '4-6 weeks', activities: ['Project Charter', 'PID Development', 'Compliance Setup'] },
        { name: 'Planning', duration: '6-8 weeks', activities: ['Detailed Planning', 'Risk Management', 'Procurement Planning'] },
        { name: 'Execution & Control', duration: '18-20 months', activities: ['Work Package Management', 'Quality Assurance', 'Progress Reporting'] },
        { name: 'Closure', duration: '4-6 weeks', activities: ['Final Acceptance', 'Documentation Archive', 'Post-Project Review'] }
      ]
    };
    
    return phaseTemplates[scenarioId] || [];
  };

  const generateStandards = (scenarioId) => {
    const standardsMap = {
      'software-dev': ['PMBOK (Tailored)', 'Scrum Framework', 'ISO 21502 (Light)'],
      'innovative-product': ['PMBOK (Adaptive)', 'Stage-Gate Hybrid', 'Lean Startup'],
      'government-project': ['PRINCE2 (Full)', 'PMBOK (Enhanced)', 'ISO 21502 (Comprehensive)']
    };
    
    return standardsMap[scenarioId] || [];
  };

  const generateTimeline = (scenarioId) => {
    const timelines = {
      'software-dev': '5-6 months with 2-week sprints',
      'innovative-product': '12 months with iterative phases',
      'government-project': '24 months with stage-gate reviews'
    };
    
    return timelines[scenarioId] || '';
  };

  return (
    <div className="process-builder">
      <div className="builder-header">
        <h2>Process Builder</h2>
        <p>Select a project scenario and customize your process</p>
      </div>

      {/* Scenario Selection */}
      <div className="scenario-selection">
        <h3>Choose Project Scenario</h3>
        <div className="scenario-cards">
          {scenarios.map(scenario => (
            <div
              key={scenario.id}
              className={`scenario-card ${selectedScenario === scenario.id ? 'selected' : ''}`}
              onClick={() => handleScenarioSelect(scenario.id)}
              style={{ '--accent-color': scenario.color }}
            >
              <div className="scenario-icon">{scenario.icon}</div>
              <h4 className="scenario-title">{scenario.title}</h4>
              <p className="scenario-description">{scenario.description}</p>
              <div className="scenario-badge">Recommended</div>
            </div>
          ))}
        </div>
      </div>

      {/* Customization Options */}
      {selectedScenario && (
        <div className="customization-section">
          <h3>Customize Your Process</h3>
          <div className="customization-options">
            {customizationOptions[selectedScenario]?.map(option => (
              <div key={option.id} className="customization-option">
                <label className="option-label">{option.label}</label>
                {option.type === 'select' ? (
                  <select
                    className="option-select"
                    onChange={(e) => handleCustomizationChange(option.id, e.target.value)}
                  >
                    <option value="">Select...</option>
                    {option.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <div className="multi-options">
                    {option.options.map(opt => (
                      <label key={opt} className="multi-option">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            const current = customizations[option.id] || [];
                            const updated = e.target.checked
                              ? [...current, opt]
                              : current.filter(item => item !== opt);
                            handleCustomizationChange(option.id, updated);
                          }}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Generate Button */}
          <button
            className="generate-button"
            onClick={generateProcess}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="loading-spinner"></span>
                Generating Process...
              </>
            ) : (
              <>
                <span className="generate-icon">✨</span>
                Generate Custom Process
              </>
            )}
          </button>
        </div>
      )}

      {/* Generated Process */}
      {generatedProcess && (
        <div className="generated-process">
          <h3>Your Custom Process</h3>
          <div className="process-overview">
            <div className="overview-card">
              <h4>Scenario</h4>
              <p>{generatedProcess.scenario}</p>
            </div>
            <div className="overview-card">
              <h4>Timeline</h4>
              <p>{generatedProcess.timeline}</p>
            </div>
            <div className="overview-card">
              <h4>Standards Applied</h4>
              <div className="standards-list">
                {generatedProcess.standards.map((standard, index) => (
                  <span key={index} className="standard-tag">{standard}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Process Phases */}
          <div className="process-phases">
            <h4>Process Phases</h4>
            <div className="phases-timeline">
              {generatedProcess.phases.map((phase, index) => (
                <div key={index} className="phase-item">
                  <div className="phase-marker">
                    <div className="phase-number">{index + 1}</div>
                  </div>
                  <div className="phase-content">
                    <h5 className="phase-name">{phase.name}</h5>
                    <span className="phase-duration">{phase.duration}</span>
                    <div className="phase-activities">
                      {phase.activities.map((activity, idx) => (
                        <span key={idx} className="activity-tag">{activity}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="process-actions">
            <button className="action-button primary">
              <span className="action-icon">📥</span>
              Download Process Document
            </button>
            <button className="action-button secondary">
              <span className="action-icon">🔄</span>
              Integrate with Tools
            </button>
            <button className="action-button secondary">
              <span className="action-icon">📊</span>
              Create Project from Template
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessBuilder;