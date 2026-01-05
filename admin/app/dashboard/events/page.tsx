'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { format } from 'date-fns';

interface Event {
    id: string;
    title: string;
    location?: string;
    startDate: string;
    endDate?: string;
    isPublished: boolean;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const response = await api.events.getAll();
            setEvents(response.data || []);
        } catch (error) {
            console.error('Failed to load events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;
        try {
            await api.events.delete(id);
            loadEvents();
        } catch (error) {
            alert('Failed to delete event');
        }
    };

    if (loading) return <div>Loading events...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
                <Link href="/dashboard/events/new" className="btn btn-primary">
                    <PlusIcon className="w-5 h-5" />
                    Add Event
                </Link>
            </div>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4">Title</th>
                                <th className="text-left p-4">Location</th>
                                <th className="text-left p-4">Start Date</th>
                                <th className="text-left p-4">End Date</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        No events found. Add your first event!
                                    </td>
                                </tr>
                            ) : (
                                events.map((event) => (
                                    <tr key={event.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{event.title}</td>
                                        <td className="p-4">{event.location || '-'}</td>
                                        <td className="p-4">{format(new Date(event.startDate), 'MMM dd, yyyy')}</td>
                                        <td className="p-4">
                                            {event.endDate ? format(new Date(event.endDate), 'MMM dd, yyyy') : '-'}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                event.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {event.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/events/${event.id}`}
                                                    className="p-2 text-primary hover:bg-primary/10 rounded"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(event.id)}
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

