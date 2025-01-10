import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Upload, CheckCircle, AlertTriangle } from 'lucide-react';

const CampaignDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaignDetails = async () => {
            try {
                const [campaignRes, submissionsRes] = await Promise.all([
                    axios.get(`/api/campaigns/${id}`),
                    axios.get(`/api/campaigns/${id}/submissions`)
                ]);
                setCampaign(campaignRes.data);
                setSubmissions(submissionsRes.data);
            } catch (error) {
                console.error('Error fetching campaign details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaignDetails();
    }, [id]);

    const handleSubmission = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('content', file);

        try {
            const response = await axios.post(`/api/campaigns/${id}/submit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSubmissions([...submissions, response.data]);
        } catch (error) {
            console.error('Error submitting content:', error);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">{campaign.title}</h1>
                <button
                    onClick={() => document.getElementById('fileUpload').click()}
                    className="btn btn-primary d-flex align-items-center"
                >
                    <Upload className="me-2" size={18} />
                    Submit Content
                </button>
                <input
                    id="fileUpload"
                    type="file"
                    className="d-none"
                    onChange={handleSubmission}
                />
            </div>

            <div className="card mb-4">
                <div className="card-header">
                    <h5 className="card-title mb-0">Campaign Progress</h5>
                </div>
                <div className="card-body">
                    <div className="progress mb-4">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${campaign.progress}%` }}
                            aria-valuenow={campaign.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            {campaign.progress}%
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col">
                            <div className="fs-4 text-primary">{campaign.totalTasks}</div>
                            <div className="text-muted">Total Tasks</div>
                        </div>
                        <div className="col">
                            <div className="fs-4 text-success">{campaign.completedTasks}</div>
                            <div className="text-muted">Completed</div>
                        </div>
                        <div className="col">
                            <div className="fs-4 text-warning">{campaign.pendingTasks}</div>
                            <div className="text-muted">Pending</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Submission History</h5>
                </div>
                <div className="card-body">
                    {submissions.map((submission) => (
                        <div
                            key={submission.id}
                            className="d-flex justify-content-between align-items-center p-3 mb-3 bg-light rounded"
                        >
                            <div className="d-flex align-items-center">
                                {submission.status === 'approved' ? (
                                    <CheckCircle className="text-success me-3" size={20} />
                                ) : (
                                    <AlertTriangle className="text-warning me-3" size={20} />
                                )}
                                <div>
                                    <div className="fw-bold">{submission.title}</div>
                                    <div className="text-muted small">
                                        Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <span
                                className={`badge ${submission.status === 'approved' ? 'bg-success' : 'bg-warning'} text-uppercase`}
                            >
                                {submission.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;
