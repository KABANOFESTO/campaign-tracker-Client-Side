import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, TrendingUp } from 'lucide-react';

const Home = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get('/api/influencer/campaigns');
                setCampaigns(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
            } catch (error) {
                console.error('Error fetching campaigns:', error);
                setCampaigns([]); // Fallback to an empty array in case of an error
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    const getStatusBadge = (status) => {
        const statusConfig = {
            'pending': 'bg-warning text-dark',
            'in_progress': 'bg-primary text-light',
            'submitted': 'bg-success text-light',
            'rejected': 'bg-danger text-light'
        };
        return statusConfig[status] || 'bg-secondary text-light';
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">My Campaigns</h1>
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
                                    <h5 className="card-title">{campaign.title}</h5>
                                    <span
                                        className={`badge ${getStatusBadge(
                                            campaign.status
                                        )}`}
                                    >
                                        {campaign.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3 text-muted">
                                        <Calendar className="me-2" />
                                        <span>Due: {new Date(campaign.deadline).toLocaleDateString()}</span>
                                    </div>
                                    <div className="mb-3 text-muted">
                                        <Clock className="me-2" />
                                        <span>{campaign.timeLeft} days left</span>
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

export default Home;
