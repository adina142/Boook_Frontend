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
      color: '#48bb78',
      standards: {
        pmbok: ['Tailoring Principle', 'Agile Practice Guide', 'Stakeholder Engagement'],
        prince2: ['Managing a Stage Boundary (Light)', 'Business Case Theme'],
        iso: ['Project Life Cycle (ISO 21502)', 'Quality Management']
      }
    },
    {
      id: 'innovative-product',
      title: 'Innovative Product Development',
      description: 'R&D-heavy, uncertain outcomes, ~1 year duration',
      icon: '🚀',
      color: '#ed8936',
      standards: {
        pmbok: ['Uncertainty Performance Domain', 'Adaptive Life Cycles', 'Models & Methods'],
        prince2: ['Business Case (Living Document)', 'Management by Exception'],
        iso: ['Risk Management (ISO 21502)', 'Reviewing Processes']
      }
    },
    {
      id: 'government-project',
      title: 'Large Government Project',
      description: 'Civil, electrical, and IT components, 2-year duration',
      icon: '🏛️',
      color: '#667eea',
      standards: {
        pmbok: ['Governance Performance Domain', 'Compliance Management', 'Stakeholder Practice Guide'],
        prince2: ['Full PRINCE2 Framework', 'Themes & Processes', 'Project Board Structure'],
        iso: ['ISO 21502 (Full)', 'Quality Assurance', 'Compliance Framework']
      }
    }
  ];

  const processTemplates = {
    'software-dev': {
      phases: [
        {
          name: 'Initiation',
          duration: '1-2 weeks',
          activities: [
            'Develop Lightweight Project Charter',
            'Identify Key Stakeholders',
            'Define High-Level Scope & Goals'
          ],
          roles: ['Project Manager', 'Product Owner', 'Sponsor'],
          deliverables: ['Project Charter (1-pager)', 'Initial Product Backlog'],
          decisionGate: 'Go-Ahead Gate: Review charter with sponsor'
        },
        {
          name: 'Sprint Planning & Execution',
          duration: 'Multiple 2-week sprints',
          activities: [
            'Sprint Planning Meetings',
            'Daily Stand-ups',
            'Backlog Refinement',
            'Continuous Integration'
          ],
          roles: ['Scrum Master', 'Development Team', 'Product Owner'],
          deliverables: ['Sprint Backlog', 'Working Software Increment', 'Burndown Charts'],
          decisionGate: 'Sprint Review: Product Owner accepts increment'
        },
        {
          name: 'Review & Adaptation',
          duration: 'Per sprint',
          activities: [
            'Sprint Review/Demo',
            'Sprint Retrospective',
            'Stakeholder Feedback'
          ],
          roles: ['Entire Team', 'Stakeholders'],
          deliverables: ['Feedback Collection', 'Retrospective Action Items'],
          decisionGate: 'Adaptation Decision: Adjust process based on learnings'
        },
        {
          name: 'Closure',
          duration: '1 week',
          activities: [
            'Final Product Delivery',
            'Project Retrospective',
            'Documentation Archive'
          ],
          roles: ['Project Manager', 'Entire Team'],
          deliverables: ['Deployed Software', 'Lessons Learned', 'Project Report'],
          decisionGate: 'Project Closure: Sponsor confirms completion'
        }
      ],
      tailoringJustification: `
        • Omitted detailed PRINCE2 documentation (PID, Product Descriptions) for lightweight Charter & Backlog
        • Adopted Scrum's iterative cycles for speed and flexibility
        • Retained PMBOK's initiating/closing for governance bookends
        • Used ISO 21502 life cycle as high-level framework without bureaucracy
      `
    },
    'innovative-product': {
      phases: [
        {
          name: 'Discovery',
          duration: '4-8 weeks',
          activities: [
            'Problem & Value Hypothesis Formulation',
            'Lean Market Research',
            'Low-Fidelity Prototyping'
          ],
          roles: ['Product Manager', 'UX Researcher', 'Tech Lead'],
          deliverables: ['Problem Statement', 'Value Hypothesis Canvas', 'Learning Metrics'],
          decisionGate: 'Go/No-Go Gate 1: Is problem worth solving?'
        },
        {
          name: 'Feasibility',
          duration: '4-6 weeks',
          activities: [
            'Build MVP/Prototype',
            'User Testing & Experiments',
            'Technical Validation'
          ],
          roles: ['Tech Lead', 'Development Team', 'Data Analyst'],
          deliverables: ['Functional MVP', 'Experiment Results', 'Pivot/Persevere Recommendation'],
          decisionGate: 'Go/No-Go Gate 2: Is solution feasible and desirable?'
        },
        {
          name: 'Build & Iterate',
          duration: '6-9 months',
          activities: [
            'Agile Development Sprints',
            'Continuous User Feedback',
            'Stakeholder Reviews'
          ],
          roles: ['Cross-functional Team', 'Project Manager'],
          deliverables: ['Product Increments', 'User Feedback', 'Updated Business Case'],
          decisionGate: 'Go/No-Go Gate 3: Is product viable for launch?'
        },
        {
          name: 'Scale & Launch',
          duration: '2-3 months',
          activities: [
            'Market Launch Preparation',
            'Scale Infrastructure',
            'Operations Handover'
          ],
          roles: ['Marketing Team', 'Operations Team', 'Project Manager'],
          deliverables: ['Launched Product', 'Performance Dashboard', 'Operations Manual'],
          decisionGate: 'Project Closure: Product in sustained operation'
        }
      ],
      tailoringJustification: `
        • Hybrid Stage-Gate & Agile: Gates provide governance, iterations enable learning
        • Living Business Case (PRINCE2): Updated with evidence at each gate
        • PMBOK Uncertainty Domain: Explicitly designed for ambiguity using hypotheses
        • ISO 21502 Risk Management: Focus on technical feasibility and market adoption risks
      `
    },
    'government-project': {
      phases: [
        {
          name: 'Pre-Initiation',
          duration: '2-4 weeks',
          activities: [
            'Feasibility Study',
            'Outline Business Case',
            'Stakeholder Analysis'
          ],
          roles: ['Executive', 'Senior User', 'Senior Supplier'],
          deliverables: ['Feasibility Report', 'Outline Business Case', 'Project Brief'],
          decisionGate: 'Project Mandate: Authorize initiation phase'
        },
        {
          name: 'Initiation',
          duration: '4-6 weeks',
          activities: [
            'Develop Project Initiation Documentation',
            'Establish Project Controls',
            'Compliance Framework Setup'
          ],
          roles: ['Project Manager', 'Project Board'],
          deliverables: ['PID (Business Case, Plans, Strategies)', 'Risk Register'],
          decisionGate: 'Project Initiation: Board approves PID'
        },
        {
          name: 'Planning',
          duration: '6-8 weeks',
          activities: [
            'Detailed Project Planning',
            'Risk Management Planning',
            'Procurement Strategy'
          ],
          roles: ['Project Manager', 'Team Managers'],
          deliverables: ['Detailed Project Plan', 'Work Packages', 'Quality Criteria'],
          decisionGate: 'Stage Plan Approval: Authorize first delivery stage'
        },
        {
          name: 'Execution & Control',
          duration: '18-20 months',
          activities: [
            'Work Package Authorization',
            'Quality Assurance',
            'Progress Reporting',
            'Issue Management'
          ],
          roles: ['Project Manager', 'Team Managers', 'Project Board'],
          deliverables: ['Work Packages', 'Highlight Reports', 'Quality Records'],
          decisionGate: 'Stage Boundary Reviews: Approve next stage'
        },
        {
          name: 'Closure',
          duration: '4-6 weeks',
          activities: [
            'Final Acceptance',
            'Post-Project Review',
            'Benefits Management',
            'Documentation Archive'
          ],
          roles: ['Project Manager', 'Project Board'],
          deliverables: ['End Project Report', 'Lessons Learned', 'Handed-over Product'],
          decisionGate: 'Project Closure: Formal project completion'
        }
      ],
      tailoringJustification: `
        • PRINCE2 as backbone: Product-focus and management by exception ideal for government projects
        • Enhanced with PMBOK practices: Detailed risk analysis and stakeholder engagement techniques
        • ISO for compliance: Ensures auditable quality management system
        • Omitted pure Agile: Unsuitable for fixed contracts and physical components
      `
    }
  };

  const handleScenarioSelect = (scenarioId) => {
    setSelectedScenario(scenarioId);
    setCustomizations({});
    setGeneratedProcess(null);
  };

  const generateProcess = async () => {
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const scenario = scenarios.find(s => s.id === selectedScenario);
    const template = processTemplates[selectedScenario];
    
    const process = {
      scenario: scenario.title,
      description: scenario.description,
      standards: scenario.standards,
      phases: template.phases,
      tailoringJustification: template.tailoringJustification,
      customizations,
      timeline: getTimeline(selectedScenario),
      teamSize: getTeamSize(selectedScenario)
    };
    
    setGeneratedProcess(process);
    setIsGenerating(false);
  };

  const getTimeline = (scenarioId) => {
    const timelines = {
      'software-dev': '5-6 months with 2-week sprints',
      'innovative-product': '12 months with iterative phases',
      'government-project': '24 months with stage-gate reviews'
    };
    return timelines[scenarioId];
  };

  const getTeamSize = (scenarioId) => {
    const sizes = {
      'software-dev': '5-7 team members',
      'innovative-product': '8-12 team members',
      'government-project': '15-25 team members'
    };
    return sizes[scenarioId];
  };

  return (
    <div className="process-builder">
      <div className="builder-header">
        <h2>Process Builder</h2>
        <p>Select a project scenario and customize your tailored process</p>
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
              
              {/* Standards Badges */}
              <div className="standards-preview">
                <div className="standard-badge pmbok">PMBOK</div>
                <div className="standard-badge prince2">PRINCE2</div>
                <div className="standard-badge iso">ISO</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Standards Reference */}
      {selectedScenario && (
        <div className="standards-reference">
          <h3>Standards Applied</h3>
          <div className="standards-grid">
            <div className="standard-card">
              <h4>PMBOK Guide</h4>
              <ul>
                {scenarios.find(s => s.id === selectedScenario).standards.pmbok.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="standard-card">
              <h4>PRINCE2</h4>
              <ul>
                {scenarios.find(s => s.id === selectedScenario).standards.prince2.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="standard-card">
              <h4>ISO 21502</h4>
              <ul>
                {scenarios.find(s => s.id === selectedScenario).standards.iso.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      {selectedScenario && (
        <div className="generate-section">
          <button
            className="generate-button"
            onClick={generateProcess}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="loading-spinner"></span>
                Generating Tailored Process...
              </>
            ) : (
              <>
                <span className="generate-icon">✨</span>
                Generate Tailored Process
              </>
            )}
          </button>
        </div>
      )}

      {/* Generated Process */}
      {generatedProcess && (
        <div className="generated-process">
          <div className="process-header-section">
            <h3>Your Tailored Process: {generatedProcess.scenario}</h3>
            <div className="process-meta">
              <span className="meta-item">📅 {generatedProcess.timeline}</span>
              <span className="meta-item">👥 {generatedProcess.teamSize}</span>
            </div>
          </div>

          {/* Tailoring Justification */}
          <div className="tailoring-section">
            <h4>Tailoring Justification</h4>
            <div className="justification-text">
              {generatedProcess.tailoringJustification.split('\n').map((line, index) => (
                <p key={index}>{line.trim()}</p>
              ))}
            </div>
          </div>

          {/* Process Phases */}
          <div className="process-phases-detailed">
            <h4>Process Phases & Decision Gates</h4>
            <div className="phases-container">
              {generatedProcess.phases.map((phase, index) => (
                <div key={index} className="phase-detailed">
                  <div className="phase-header">
                    <div className="phase-number">Phase {index + 1}</div>
                    <h5 className="phase-name">{phase.name}</h5>
                    <span className="phase-duration">{phase.duration}</span>
                  </div>
                  
                  <div className="phase-details">
                    <div className="detail-column">
                      <h6>Key Activities</h6>
                      <ul>
                        {phase.activities.map((activity, idx) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="detail-column">
                      <h6>Roles</h6>
                      <div className="roles-list">
                        {phase.roles.map((role, idx) => (
                          <span key={idx} className="role-tag">{role}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="detail-column">
                      <h6>Deliverables</h6>
                      <ul>
                        {phase.deliverables.map((deliverable, idx) => (
                          <li key={idx}>{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="decision-gate">
                    <div className="gate-icon">🚦</div>
                    <div className="gate-content">
                      <strong>Decision Gate:</strong> {phase.decisionGate}
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
              Create Project from This Process
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessBuilder;
