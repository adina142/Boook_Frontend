import React, { useState, useEffect } from 'react';
import './ProcessTemplates.css';

const ProcessTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call to fetch templates
    const fetchTemplates = async () => {
      // In a real app, this would be an API call
      const mockTemplates = [
        {
          id: 'software-dev',
          name: 'Agile Software Development',
          description: 'Lightweight process optimized for speed and flexibility with well-defined requirements',
          category: 'software',
          duration: '3-6 months',
          teamSize: '5-7 members',
          complexity: 'Low',
          standards: ['PMBOK (Tailored)', 'Scrum', 'ISO 21502 (Light)'],
          icon: '💻',
          color: '#48bb78',
          lastUpdated: '2024-01-15',
          usageCount: 142,
          rating: 4.8
        },
        {
          id: 'innovative-product',
          name: 'Innovative Product Development',
          description: 'Hybrid process balancing innovation, iteration, and stakeholder management for R&D projects',
          category: 'innovation',
          duration: '9-12 months',
          teamSize: '8-12 members',
          complexity: 'Medium',
          standards: ['PMBOK (Adaptive)', 'Stage-Gate', 'Lean Startup'],
          icon: '🚀',
          color: '#ed8936',
          lastUpdated: '2024-01-10',
          usageCount: 89,
          rating: 4.6
        },
        {
          id: 'government-project',
          name: 'Government Project Framework',
          description: 'Comprehensive process covering governance, compliance, procurement, and risk management',
          category: 'government',
          duration: '18-24 months',
          teamSize: '15-25 members',
          complexity: 'High',
          standards: ['PRINCE2', 'PMBOK (Enhanced)', 'ISO 21502'],
          icon: '🏛️',
          color: '#667eea',
          lastUpdated: '2024-01-05',
          usageCount: 67,
          rating: 4.9
        },
        {
          id: 'marketing-campaign',
          name: 'Digital Marketing Campaign',
          description: 'Flexible process for digital marketing projects with rapid iteration and performance tracking',
          category: 'marketing',
          duration: '1-3 months',
          teamSize: '3-5 members',
          complexity: 'Low',
          standards: ['PMBOK (Light)', 'Agile Marketing'],
          icon: '📱',
          color: '#9f7aea',
          lastUpdated: '2024-01-12',
          usageCount: 156,
          rating: 4.5
        },
        {
          id: 'construction',
          name: 'Construction Project Management',
          description: 'Structured process for construction projects with phased delivery and quality gates',
          category: 'construction',
          duration: '12-36 months',
          teamSize: '20-50 members',
          complexity: 'High',
          standards: ['PMBOK', 'PRINCE2', 'ISO 21502'],
          icon: '🏗️',
          color: '#f56565',
          lastUpdated: '2024-01-08',
          usageCount: 78,
          rating: 4.7
        },
        {
          id: 'research-project',
          name: 'Academic Research Project',
          description: 'Adaptive process for research projects with iterative experimentation and peer review',
          category: 'research',
          duration: '6-18 months',
          teamSize: '4-8 members',
          complexity: 'Medium',
          standards: ['PMBOK (Adaptive)', 'Research Methodology'],
          icon: '🔬',
          color: '#4299e1',
          lastUpdated: '2024-01-03',
          usageCount: 45,
          rating: 4.4
        }
      ];
      setTemplates(mockTemplates);
    };

    fetchTemplates();
  }, []);

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'software', name: 'Software Development', count: templates.filter(t => t.category === 'software').length },
    { id: 'innovation', name: 'Innovation & R&D', count: templates.filter(t => t.category === 'innovation').length },
    { id: 'government', name: 'Government & Enterprise', count: templates.filter(t => t.category === 'government').length },
    { id: 'marketing', name: 'Marketing', count: templates.filter(t => t.category === 'marketing').length },
    { id: 'construction', name: 'Construction', count: templates.filter(t => t.category === 'construction').length },
    { id: 'research', name: 'Research', count: templates.filter(t => t.category === 'research').length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesFilter = filter === 'all' || template.category === filter;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUseTemplate = (templateId) => {
    // Navigate to process builder with this template pre-selected
    console.log('Using template:', templateId);
    // In a real app, this would navigate to the builder with the template ID
    alert(`Template ${templateId} selected! Redirecting to Process Builder...`);
  };

  const handlePreviewTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const closePreview = () => {
    setSelectedTemplate(null);
  };

  return (
    <div className="process-templates">
      {/* Header */}
      <div className="templates-header">
        <h2>Process Templates</h2>
        <p>Choose from pre-built templates or customize your own process</p>
        
        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="search-stats">
            {filteredTemplates.length} templates found
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-filter ${filter === category.id ? 'active' : ''}`}
            onClick={() => setFilter(category.id)}
          >
            <span className="category-name">{category.name}</span>
            <span className="category-count">{category.count}</span>
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="templates-grid">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            className="template-card"
            style={{ '--accent-color': template.color }}
          >
            <div className="template-header">
              <div className="template-icon" style={{ backgroundColor: template.color }}>
                {template.icon}
              </div>
              <div className="template-meta">
                <div className="template-usage">
                  <span className="usage-count">{template.usageCount} uses</span>
                  <div className="template-rating">
                    <span className="rating-stars">⭐</span>
                    <span className="rating-value">{template.rating}</span>
                  </div>
                </div>
                <span className="template-updated">Updated {template.lastUpdated}</span>
              </div>
            </div>

            <div className="template-content">
              <h3 className="template-name">{template.name}</h3>
              <p className="template-description">{template.description}</p>
              
              <div className="template-details">
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{template.duration}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Team Size:</span>
                  <span className="detail-value">{template.teamSize}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Complexity:</span>
                  <span className={`detail-value complexity-${template.complexity.toLowerCase()}`}>
                    {template.complexity}
                  </span>
                </div>
              </div>

              <div className="template-standards">
                <span className="standards-label">Standards:</span>
                <div className="standards-tags">
                  {template.standards.map((standard, index) => (
                    <span key={index} className="standard-tag">{standard}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="template-actions">
              <button
                className="action-button primary"
                onClick={() => handleUseTemplate(template.id)}
              >
                <span className="action-icon">🚀</span>
                Use Template
              </button>
              <button
                className="action-button secondary"
                onClick={() => handlePreviewTemplate(template)}
              >
                <span className="action-icon">👁️</span>
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No templates found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button
            className="reset-filters"
            onClick={() => {
              setFilter('all');
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="preview-modal">
          <div className="modal-backdrop" onClick={closePreview}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedTemplate.name}</h3>
              <button className="close-button" onClick={closePreview}>×</button>
            </div>
            <div className="modal-body">
              <div className="preview-header">
                <div className="preview-icon" style={{ backgroundColor: selectedTemplate.color }}>
                  {selectedTemplate.icon}
                </div>
                <div className="preview-meta">
                  <p className="preview-description">{selectedTemplate.description}</p>
                  <div className="preview-stats">
                    <span className="stat">⭐ {selectedTemplate.rating}</span>
                    <span className="stat">👥 {selectedTemplate.usageCount} uses</span>
                    <span className="stat">🕐 {selectedTemplate.duration}</span>
                  </div>
                </div>
              </div>

              <div className="preview-details">
                <div className="detail-section">
                  <h4>Process Overview</h4>
                  <div className="detail-grid">
                    <div className="detail-card">
                      <span className="detail-title">Team Size</span>
                      <span className="detail-value">{selectedTemplate.teamSize}</span>
                    </div>
                    <div className="detail-card">
                      <span className="detail-title">Complexity</span>
                      <span className="detail-value">{selectedTemplate.complexity}</span>
                    </div>
                    <div className="detail-card">
                      <span className="detail-title">Last Updated</span>
                      <span className="detail-value">{selectedTemplate.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Applied Standards</h4>
                  <div className="standards-list">
                    {selectedTemplate.standards.map((standard, index) => (
                      <div key={index} className="standard-item">
                        <span className="standard-bullet">•</span>
                        {standard}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Best For</h4>
                  <ul className="best-for-list">
                    {getBestForItems(selectedTemplate.category).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="action-button secondary" onClick={closePreview}>
                Cancel
              </button>
              <button
                className="action-button primary"
                onClick={() => handleUseTemplate(selectedTemplate.id)}
              >
                <span className="action-icon">🚀</span>
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get "Best For" items based on category
const getBestForItems = (category) => {
  const items = {
    software: [
      'Web and mobile application development',
      'Projects with changing requirements',
      'Small to medium-sized teams',
      'Fast-paced delivery environments'
    ],
    innovation: [
      'Research and development projects',
      'Product discovery phases',
      'Uncertain or evolving requirements',
      'Experimentation and validation'
    ],
    government: [
      'Large-scale infrastructure projects',
      'Regulated industries',
      'Projects requiring extensive documentation',
      'Multiple stakeholder coordination'
    ],
    marketing: [
      'Digital marketing campaigns',
      'Content creation projects',
      'Social media initiatives',
      'Performance-driven projects'
    ],
    construction: [
      'Building and construction projects',
      'Infrastructure development',
      'Projects with strict safety requirements',
      'Phased delivery models'
    ],
    research: [
      'Academic research projects',
      'Scientific studies',
      'Data analysis projects',
      'Peer-reviewed work'
    ]
  };
  
  return items[category] || ['Various project types and team sizes'];
};

export default ProcessTemplates;