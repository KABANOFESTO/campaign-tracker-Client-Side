import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/influencer/performance');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching performance stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Ensure stats.recentCampaigns is an array before mapping
    const recentCampaigns = Array.isArray(stats.recentCampaigns) ? stats.recentCampaigns : [];

    return (
        <div className="container py-4">
            <h1 className="mb-4">Performance Overview</h1>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Total Campaigns</h5>
                            <p className="card-text display-4 text-primary">{stats.totalCampaigns}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Success Rate</h5>
                            <p className="card-text display-4 text-success">{stats.successRate}%</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title">Average Engagement</h5>
                            <p className="card-text display-4 text-secondary">{stats.avgEngagement}%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-body">
                    <h5 className="card-title">Engagement Trends</h5>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.engagementTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="engagement" stroke="#4F46E5" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-body">
                    <h5 className="card-title">Recent Performance</h5>
                    <ul className="list-group">
                        {recentCampaigns.map((campaign) => (
                            <li key={campaign.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h6>{campaign.title}</h6>
                                    <small className="text-muted">Completed on {new Date(campaign.completedAt).toLocaleDateString()}</small>
                                </div>
                                <div className="text-end">
                                    <p className="mb-0 text-primary">{campaign.engagement}% Engagement</p>
                                    <small className="text-muted">{campaign.interactions} Interactions</small>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PerformanceStats;
