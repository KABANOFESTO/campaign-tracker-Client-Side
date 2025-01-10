import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, TrendingUp } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    // Hardcoded campaigns data
    const campaigns = [
        {
            id: 1,
            title: 'Campaign One',
            description: 'This is the description for Campaign One.',
            deadline: '2025-02-15',
            status: 'pending',
            timeLeft: 30,
            engagementRate: 75
        },
        {
            id: 2,
            title: 'Campaign Two',
            description: 'This is the description for Campaign Two.',
            deadline: '2025-03-10',
            status: 'in_progress',
            timeLeft: 45,
            engagementRate: 80
        },
        {
            id: 3,
            title: 'Campaign Three',
            description: 'This is the description for Campaign Three.',
            deadline: '2025-01-25',
            status: 'submitted',
            timeLeft: 5,
            engagementRate: 85
        },
        {
            id: 4,
            title: 'Campaign Four',
            description: 'This is the description for Campaign Four.',
            deadline: '2025-04-20',
            status: 'rejected',
            timeLeft: 60,
            engagementRate: 60
        },
        {
            id: 5,
            title: 'Campaign Five',
            description: 'This is the description for Campaign Five.',
            deadline: '2025-05-15',
            status: 'pending',
            timeLeft: 90,
            engagementRate: 70
        },
        {
            id: 6,
            title: 'Campaign Six',
            description: 'This is the description for Campaign Six.',
            deadline: '2025-06-30',
            status: 'in_progress',
            timeLeft: 120,
            engagementRate: 90
        }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            'pending': 'bg-warning text-dark',
            'in_progress': 'bg-primary text-light',
            'submitted': 'bg-success text-light',
            'rejected': 'bg-danger text-light'
        };
        return statusConfig[status] || 'bg-secondary text-light';
    };

    return (
        <div className="container mt-5">
            {campaigns.length === 0 ? (
                <div className="text-center">
                    <h3>No campaigns found</h3>
                </div>
            ) : (
                <div className="row g-4">
                    {campaigns.map((campaign) => (
                        <div
                            key={campaign.id}
                            className="col-12 col-md-6 col-lg-4"
                            onClick={() => navigate(`/campaign/${campaign.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card shadow-sm h-100">
                                <div className="card-header d-flex justify-content-between align-items-start">
                                    <h5 className="card-title text-truncate" style={{ maxWidth: '200px' }}>
                                        {campaign.title}
                                    </h5>
                                    <span
                                        className={`badge ${getStatusBadge(
                                            campaign.status
                                        )}`}
                                    >
                                        {campaign.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <p className="card-text mb-3 text-muted">
                                        {campaign.description || 'No description available for this campaign.'}
                                    </p>
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="text-muted">
                                            <Calendar className="me-2" />
                                            <span>Due: {new Date(campaign.deadline).toLocaleDateString()}</span>
                                        </div>
                                        <div className="text-muted">
                                            <Clock className="me-2" />
                                            <span>{campaign.timeLeft} days left</span>
                                        </div>
                                    </div>
                                    <div className="text-muted">
                                        <TrendingUp className="me-2" />
                                        <span>Engagement Rate: {campaign.engagementRate}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LandingPage;
