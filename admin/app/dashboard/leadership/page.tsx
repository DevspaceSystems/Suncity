'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Leader {
    id: string;
    name: string;
    title: string;
    position: string;
    constituency?: string;
    imageUrl?: string;
    message: string;
    order: number;
    isActive: boolean;
}

export default function LeadershipPage() {
    const [leaders, setLeaders] = useState<Leader[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLeaders();
    }, []);

    const loadLeaders = async () => {
        try {
            const response = await api.leaders.getAll();
            setLeaders(response.data || []);
        } catch (error) {
            console.error('Failed to load leaders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this leader?')) return;

        try {
            await api.leaders.delete(id);
            loadLeaders();
        } catch (error) {
            alert('Failed to delete leader');
        }
    };

    if (loading) {
        return <div>Loading leaders...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Leadership Management</h1>
                <Link href="/dashboard/leadership/new" className="btn btn-primary">
                    <PlusIcon className="w-5 h-5" />
                    Add Leader
                </Link>
            </div>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">Title</th>
                                <th className="text-left p-4">Position</th>
                                <th className="text-left p-4">Constituency</th>
                                <th className="text-left p-4">Order</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">
                                        No leaders found. Add your first leader!
                                    </td>
                                </tr>
                            ) : (
                                leaders.map((leader) => (
                                    <tr key={leader.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{leader.name}</td>
                                        <td className="p-4">{leader.title}</td>
                                        <td className="p-4">{leader.position}</td>
                                        <td className="p-4">{leader.constituency || '-'}</td>
                                        <td className="p-4">{leader.order}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                leader.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {leader.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/leadership/${leader.id}`}
                                                    className="p-2 text-primary hover:bg-primary/10 rounded"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(leader.id)}
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

