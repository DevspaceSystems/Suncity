'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { format } from 'date-fns';

interface Job {
    id: string;
    title: string;
    companyName: string;
    location?: string;
    jobType?: string;
    deadline?: string;
    isActive: boolean;
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const response = await api.jobs.getAll();
            setJobs(response.data || []);
        } catch (error) {
            console.error('Failed to load jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this job?')) return;
        try {
            await api.jobs.delete(id);
            loadJobs();
        } catch (error) {
            alert('Failed to delete job');
        }
    };

    if (loading) return <div>Loading jobs...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
                <Link href="/dashboard/jobs/new" className="btn btn-primary">
                    <PlusIcon className="w-5 h-5" />
                    Add Job
                </Link>
            </div>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4">Title</th>
                                <th className="text-left p-4">Company</th>
                                <th className="text-left p-4">Location</th>
                                <th className="text-left p-4">Type</th>
                                <th className="text-left p-4">Deadline</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">
                                        No jobs found. Add your first job posting!
                                    </td>
                                </tr>
                            ) : (
                                jobs.map((job) => (
                                    <tr key={job.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{job.title}</td>
                                        <td className="p-4">{job.companyName}</td>
                                        <td className="p-4">{job.location || '-'}</td>
                                        <td className="p-4">{job.jobType || '-'}</td>
                                        <td className="p-4">
                                            {job.deadline ? format(new Date(job.deadline), 'MMM dd, yyyy') : '-'}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                job.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {job.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/jobs/${job.id}`}
                                                    className="p-2 text-primary hover:bg-primary/10 rounded"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(job.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

