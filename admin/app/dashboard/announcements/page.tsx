'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { format } from 'date-fns';

interface Announcement {
    id: string;
    title: string;
    category?: string;
    priority: string;
    isPublished: boolean;
    publishedAt?: string;
    createdAt: string;
}

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const loadAnnouncements = async () => {
        try {
            const response = await api.announcements.getAll();
            setAnnouncements(response.data || []);
        } catch (error) {
            console.error('Failed to load announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;
        try {
            await api.announcements.delete(id);
            loadAnnouncements();
        } catch (error) {
            alert('Failed to delete announcement');
        }
    };

    if (loading) return <div>Loading announcements...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Announcement Management</h1>
                <Link href="/dashboard/announcements/new" className="btn btn-primary">
                    <PlusIcon className="w-5 h-5" />
                    Add Announcement
                </Link>
            </div>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4">Title</th>
                                <th className="text-left p-4">Category</th>
                                <th className="text-left p-4">Priority</th>
                                <th className="text-left p-4">Created</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        No announcements found. Add your first announcement!
                                    </td>
                                </tr>
                            ) : (
                                announcements.map((announcement) => (
                                    <tr key={announcement.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{announcement.title}</td>
                                        <td className="p-4">{announcement.category || '-'}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {announcement.priority}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm">
                                            {format(new Date(announcement.createdAt), 'MMM dd, yyyy')}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                announcement.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {announcement.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/announcements/${announcement.id}`}
                                                    className="p-2 text-primary hover:bg-primary/10 rounded"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(announcement.id)}
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

