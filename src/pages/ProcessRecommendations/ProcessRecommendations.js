import React, { useState } from 'react';
import './ProcessRecommendations.css';

const ProcessRecommendations = () => {
  const [formData, setFormData] = useState({
    projectType: '',
    teamSize: '',
    duration: '',
    budget: '',
    riskLevel: '',
    complianceRequirements: [],
    stakeholderComplexity: '',
    teamExperience: '',
    technologyFamiliarity: ''
  });

  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const projectTypes = [
    'Software Development',
    'Product Innovation',
    'Infrastructure',
    'Marketing Campaign',
    'Research & Development',
    'Construction',
    'Government Project',
    'Non-profit Initiative'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const currentValues = prev[field] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [field]: updatedValues
      };
    });
  };

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const aiRecommendations = {
      recommendedProcess: getRecommendedProcess(formData),
      confidenceScore: calculateConfidenceScore(formData),
      keyConsiderations: generateConsiderations(formData),
      riskFactors: identifyRisks(formData),
      successMetrics: suggestMetrics(formData),
      alternativeApproaches: getAlternativeApproaches(formData)
    };
    
    setRecommendations(aiRecommendations);
    setIsLoading(false);
  };

  const getRecommendedProcess = (data) => {
    // AI logic to determine the best process
    if (data.projectType === 'Software Development' && data.teamSize < 10) {
      return {
        name: 'Agile Scrum',
        description: 'Iterative development with 2-week sprints',
        suitability: '95% match',
        reasoning: 'Small team size and software focus make Scrum ideal',
        standards: ['PMBOK (Tailored)', 'Scrum Guide', 'ISO 21502 (Light)']
      };
    } else if (data.projectType === 'Government Project') {
      return {
        name: 'PRINCE2 Framework',
        description: 'Structured project management with governance focus',
        suitability: '92% match',
        reasoning: 'Government projects require strong governance and documentation',
        standards: ['PRINCE2', 'PMBOK (Enhanced)', 'ISO 21502']
      };
    } else if (data.riskLevel === 'High' && data.teamExperience === 'Low') {
      return {
        name: 'Hybrid Waterfall-Agile',
        description: 'Balanced approach with phased planning and iterative execution',
        suitability: '88% match',
        reasoning: 'Mitigates risk through planning while allowing flexibility',
        standards: ['PMBOK (Hybrid)', 'PRINCE2 (Tailored)']
      };
    } else {
      return {
        name: 'Adaptive Project Framework',
        description: 'Flexible approach that evolves with project needs',
        suitability: '85% match',
        reasoning: 'Balances structure with adaptability for uncertain environments',
        standards: ['PMBOK (Adaptive)', 'Agile Principles']
      };
    }
  };

  const calculateConfidenceScore = (data) => {
    // Simple scoring algorithm
    let score = 75;
    if (data.projectType && data.teamSize && data.duration) score += 15;
    if (data.riskLevel && data.teamExperience) score += 10;
    return Math.min(score, 95);
  };

  const generateConsiderations = (data) => [
    'Team experience level may require additional training',
    'Consider stakeholder communication frequency',
    'Budget constraints suggest phased delivery approach',
    'Technology stack familiarity impacts velocity'
  ];

  const identifyRisks = (data) => [
    { risk: 'Scope creep', level: 'Medium', mitigation: 'Implement change control' },
    { risk: 'Team inexperience', level: 'High', mitigation: 'Provide mentoring and training' },
    { risk: 'Stakeholder alignment', level: 'Medium', mitigation: 'Regular review meetings' }
  ];

  const suggestMetrics = (data) => [
    'Velocity and throughput',
    'Stakeholder satisfaction',
    'Budget adherence',
    'Quality metrics'
  ];

  const getAlternativeApproaches = (data) => [
    {
      name: 'Kanban Method',
      description: 'Flow-based approach for continuous delivery',
      suitability: '78% match',
      pros: ['Flexible', 'Visual workflow', 'Reduces bottlenecks'],
      cons: ['Less structured', 'Requires discipline']
    },
    {
      name: 'Waterfall',
      description: 'Sequential phase-based approach',
      suitability: '45% match',
      pros: ['Predictable', 'Clear milestones', 'Good documentation'],
      cons: ['Inflexible', 'Late feedback', 'Higher risk']
    }
  ];

  const isFormValid = formData.projectType && formData.teamSize && formData.duration;

  return (
    <div className="process-recommendations">
      <div className="recommendations-header">
        <h2>AI Process Recommendations</h2>
        <p>Get intelligent process suggestions based on your project characteristics</p>
      </div>

      <div className="recommendations-container">
        {/* Input Form */}
        <div className="input-section">
          <h3>Project Profile</h3>
          <div className="input-grid">
            <div className="input-group">
              <label>Project Type *</label>
              <select
                value={formData.projectType}
                onChange={(e) => handleInputChange('projectType', e.target.value)}
              >
                <option value="">Select project type...</option>
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Team Size *</label>
              <select
                value={formData.teamSize}
                onChange={(e) => handleInputChange('teamSize', e.target.value)}
              >
                <option value="">Select team size...</option>
                <option value="1-5">1-5 people</option>
                <option value="6-10">6-10 people</option>
                <option value="11-20">11-20 people</option>
                <option value="21-50">21-50 people</option>
                <option value="50+">50+ people</option>
              </select>
            </div>

            <div className="input-group">
              <label>Project Duration *</label>
              <select
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              >
                <option value="">Select duration...</option>
                <option value="<3 months">&lt; 3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2+ years">2+ years</option>
              </select>
            </div>

            <div className="input-group">
              <label>Budget Range</label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              >
                <option value="">Select budget...</option>
                <option value="<50k">&lt; $50,000</option>
                <option value="50k-250k">$50,000 - $250,000</option>
                <option value="250k-1M">$250,000 - $1M</option>
                <option value="1M+">$1M+</option>
              </select>
            </div>

            <div className="input-group">
              <label>Risk Level</label>
              <select
                value={formData.riskLevel}
                onChange={(e) => handleInputChange('riskLevel', e.target.value)}
              >
                <option value="">Select risk level...</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="input-group">
              <label>Team Experience</label>
              <select
                value={formData.teamExperience}
                onChange={(e) => handleInputChange('teamExperience', e.target.value)}
              >
                <option value="">Select experience level...</option>
                <option value="Novice">Novice (0-2 years)</option>
                <option value="Intermediate">Intermediate (2-5 years)</option>
                <option value="Expert">Expert (5+ years)</option>
              </select>
            </div>
          </div>

          <div className="multi-select-group">
            <label>Compliance Requirements</label>
            <div className="checkbox-grid">
              {['ISO Standards', 'Government Regulations', 'Industry Specific', 'Security Compliance', 'Quality Assurance'].map(req => (
                <label key={req} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.complianceRequirements?.includes(req) || false}
                    onChange={() => handleMultiSelect('complianceRequirements', req)}
                  />
                  <span>{req}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            className="generate-recommendations-btn"
            onClick={generateRecommendations}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                AI is analyzing your project...
              </>
            ) : (
              <>
                <span className="ai-icon">🤖</span>
                Get AI Recommendations
              </>
            )}
          </button>
        </div>

        {/* Recommendations Output */}
        {recommendations && (
          <div className="output-section">
            <div className="recommendation-card primary">
              <div className="card-header">
                <h3>Recommended Process</h3>
                <div className="confidence-score">
                  {recommendations.confidenceScore}% Match
                </div>
              </div>
              <div className="process-recommendation">
                <h4>{recommendations.recommendedProcess.name}</h4>
                <p>{recommendations.recommendedProcess.description}</p>
                <div className="reasoning">
                  <strong>Why this approach:</strong> {recommendations.recommendedProcess.reasoning}
                </div>
                <div className="standards-applied">
                  <strong>Standards:</strong>
                  <div className="standards-tags">
                    {recommendations.recommendedProcess.standards.map((standard, index) => (
                      <span key={index} className="standard-tag">{standard}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="recommendations-grid">
              <div className="recommendation-card">
                <h4>Key Considerations</h4>
                <ul className="considerations-list">
                  {recommendations.keyConsiderations.map((consideration, index) => (
                    <li key={index}>{consideration}</li>
                  ))}
                </ul>
              </div>

              <div className="recommendation-card">
                <h4>Risk Assessment</h4>
                <div className="risks-list">
                  {recommendations.riskFactors.map((risk, index) => (
                    <div key={index} className="risk-item">
                      <div className="risk-header">
                        <span className="risk-name">{risk.risk}</span>
                        <span className={`risk-level ${risk.level.toLowerCase()}`}>
                          {risk.level}
                        </span>
                      </div>
                      <div className="risk-mitigation">{risk.mitigation}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="recommendation-card">
                <h4>Success Metrics</h4>
                <div className="metrics-list">
                  {recommendations.successMetrics.map((metric, index) => (
                    <div key={index} className="metric-item">
                      <span className="metric-icon">📊</span>
                      {metric}
                    </div>
                  ))}
                </div>
              </div>

              <div className="recommendation-card">
                <h4>Alternative Approaches</h4>
                <div className="alternatives-list">
                  {recommendations.alternativeApproaches.map((alt, index) => (
                    <div key={index} className="alternative-item">
                      <h5>{alt.name} ({alt.suitability})</h5>
                      <p>{alt.description}</p>
                      <div className="pros-cons">
                        <div className="pros">
                          <strong>Pros:</strong> {alt.pros.join(', ')}
                        </div>
                        <div className="cons">
                          <strong>Cons:</strong> {alt.cons.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="action-button primary">
                <span className="action-icon">🚀</span>
                Apply This Recommendation
              </button>
              <button className="action-button secondary">
                <span className="action-icon">📥</span>
                Download Report
              </button>
              <button className="action-button secondary">
                <span className="action-icon">🔄</span>
                Regenerate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI Explanation */}
      {recommendations && (
        <div className="ai-explanation">
          <div className="explanation-header">
            <span className="ai-avatar">🤖</span>
            <h4>AI Explanation</h4>
          </div>
          <p>
            Based on your project characteristics, I've recommended {recommendations.recommendedProcess.name} because 
            it best aligns with your team size, project duration, and risk profile. This approach balances the need 
            for structure with the flexibility required for your specific context.
          </p>
          <p>
            The alternative approaches provide options if your priorities shift toward more predictability 
            or greater flexibility. Consider your organization's culture and the team's comfort with change 
            when making your final decision.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProcessRecommendations;