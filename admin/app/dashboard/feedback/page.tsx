'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { format } from 'date-fns';

interface Feedback {
    id: string;
    type: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    status: string;
    createdAt: string;
}

export default function FeedbackPage() {
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        loadFeedback();
    }, []);

    const loadFeedback = async () => {
        try {
            const response = await api.feedback.getAll();
            setFeedback(response.data || []);
        } catch (error) {
            console.error('Failed to load feedback:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await api.feedback.updateStatus(id, status);
            loadFeedback();
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const filteredFeedback = filter === 'all' 
        ? feedback 
        : feedback.filter(f => f.status === filter);

    if (loading) {
        return <div>Loading feedback...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Feedback & Messages</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    >
                        All ({feedback.length})
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    >
                        Pending ({feedback.filter(f => f.status === 'pending').length})
                    </button>
                    <button
                        onClick={() => setFilter('read')}
                        className={`px-4 py-2 rounded ${filter === 'read' ? 'bg-primary text-white' : 'bg-gray-200'}`}
                    >
                        Read ({feedback.filter(f => f.status === 'read').length})
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {filteredFeedback.length === 0 ? (
                    <div className="card text-center py-12">
                        <p className="text-gray-500">No feedback messages found.</p>
                    </div>
                ) : (
                    filteredFeedback.map((item) => (
                        <div key={item.id} className="card">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <p className="text-sm text-gray-600">{item.email}</p>
                                    {item.phone && <p className="text-sm text-gray-600">{item.phone}</p>}
                                </div>
                                <div className="text-right">
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        item.status === 'read' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {item.status}
                                    </span>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {format(new Date(item.createdAt), 'MMM dd, yyyy HH:mm')}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                                    {item.type}
                                </span>
                                {item.subject && (
                                    <h4 className="font-semibold mt-2">{item.subject}</h4>
                                )}
                                <p className="text-gray-700 mt-2 whitespace-pre-wrap">{item.message}</p>
                            </div>

                            <div className="flex gap-2">
                                {item.status === 'pending' && (
                                    <button
                                        onClick={() => handleStatusUpdate(item.id, 'read')}
                                        className="btn btn-secondary text-sm"
                                    >
                                        Mark as Read
                                    </button>
                                )}
                                <button
                                    onClick={() => handleStatusUpdate(item.id, 'archived')}
                                    className="btn bg-gray-200 text-gray-700 text-sm hover:bg-gray-300"
                                >
                                    Archive
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

