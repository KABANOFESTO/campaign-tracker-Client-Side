import React, { useState } from 'react';
import { Users, CheckSquare, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import '../css/dash.css';

// Sample data remains the same
const influencers = [
  { id: 1, name: "Sarah Johnson", handle: "@sarahj", submissions: 3, joinDate: "2025-01-05", status: "pending" },
  { id: 2, name: "Mike Smith", handle: "@mikesmith", submissions: 2, joinDate: "2025-01-06", status: "approved" },
  { id: 3, name: "Emma Davis", handle: "@emmad", submissions: 1, joinDate: "2025-01-07", status: "rejected" },
];

const submissions = [
  { 
    id: 1, 
    influencer: "Sarah Johnson", 
    handle: "@sarahj",
    content: "Check out this amazing product! #sponsored", 
    platform: "Instagram",
    submittedDate: "2025-01-08",
    status: "pending"
  },
  { 
    id: 2, 
    influencer: "Mike Smith", 
    handle: "@mikesmith",
    content: "Loving this new release! #ad", 
    platform: "Twitter",
    submittedDate: "2025-01-09",
    status: "pending"
  },
];

const CampaignDashboard = () => {
  const [activeTab, setActiveTab] = useState('influencers');
  
  const handleApproval = (submissionId, action) => {
    console.log(`Submission ${submissionId} ${action}`);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved': return 'badge-soft-success';
      case 'rejected': return 'badge-soft-danger';
      default: return 'badge-soft-warning';
    }
  };

  const renderInfluencerList = () => (
    <div>
      <h2 className="fw-bold mb-4 fs-4">Campaign Influencers</h2>
      <div className="d-grid gap-3">
        {influencers.map((influencer) => (
          <div key={influencer.id} className="card shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="fw-semibold mb-1">{influencer.name}</h3>
                  <p className="text-muted small mb-1">{influencer.handle}</p>
                  <p className="small mb-0">Joined: {influencer.joinDate}</p>
                </div>
                <div className="text-end">
                  <p className="fw-semibold mb-2">Submissions: {influencer.submissions}</p>
                  <span className={`badge ${getStatusBadgeClass(influencer.status)}`}>
                    {influencer.status.charAt(0).toUpperCase() + influencer.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubmissionApproval = () => (
    <div>
      <h2 className="fw-bold mb-4 fs-4">Content Submissions</h2>
      <div className="d-grid gap-3">
        {submissions.map((submission) => (
          <div key={submission.id} className="card shadow-sm">
            <div className="card-body p-4">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="fw-semibold mb-1">{submission.influencer}</h3>
                    <p className="text-muted small mb-0">{submission.handle}</p>
                  </div>
                  <span className="badge badge-soft-primary">
                    {submission.platform}
                  </span>
                </div>
              </div>
              <p className="text-secondary mb-3">{submission.content}</p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="text-muted small mb-0">Submitted: {submission.submittedDate}</p>
                <div className="d-flex gap-2">
                  <button
                    onClick={() => handleApproval(submission.id, 'approved')}
                    className="btn btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(submission.id, 'rejected')}
                    className="btn btn-danger"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Fixed Sidebar */}
      <div className="sidebar bg-white shadow" style={{ width: '256px' }}>
        <div className="p-4">
          <h1 className="fs-5 fw-bold mb-0">Campaign Manager</h1>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setActiveTab('influencers')}
            className={`d-flex align-items-center w-100 px-4 py-3 text-start border-0 ${
              activeTab === 'influencers' ? 'active-nav-item' : 'nav-item'
            }`}
          >
            <Users className="me-3" size={20} />
            Influencers
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`d-flex align-items-center w-100 px-4 py-3 text-start border-0 ${
              activeTab === 'submissions' ? 'active-nav-item' : 'nav-item'
            }`}
          >
            <CheckSquare className="me-3" size={20} />
            Submissions
          </button>
          <button className="d-flex align-items-center w-100 px-4 py-3 text-start border-0 nav-item">
            <LayoutDashboard className="me-3" size={20} />
            Dashboard
          </button>
          <button className="d-flex align-items-center w-100 px-4 py-3 text-start border-0 nav-item">
            <Settings className="me-3" size={20} />
            Settings
          </button>
          <button className="d-flex align-items-center w-100 px-4 py-3 text-start border-0 nav-item">
            <LogOut className="me-3" size={20} />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 overflow-auto p-4">
        {activeTab === 'influencers' ? renderInfluencerList() : renderSubmissionApproval()}
      </div>
    </div>
  );
};

export default CampaignDashboard;