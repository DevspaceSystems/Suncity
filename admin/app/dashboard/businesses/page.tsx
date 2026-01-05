'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Business {
    id: string;
    name: string;
    description?: string;
    sector?: string;
    area?: string;
    phone?: string;
    email?: string;
    isVerified: boolean;
}

export default function BusinessesPage() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBusinesses();
    }, []);

    const loadBusinesses = async () => {
        try {
            const response = await api.businesses.getAll();
            setBusinesses(response.data || []);
        } catch (error) {
            console.error('Failed to load businesses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this business?')) return;
        try {
            await api.businesses.delete(id);
            loadBusinesses();
        } catch (error) {
            alert('Failed to delete business');
        }
    };

    if (loading) return <div>Loading businesses...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Business Management</h1>
                <Link href="/dashboard/businesses/new" className="btn btn-primary">
                    <PlusIcon className="w-5 h-5" />
                    Add Business
                </Link>
            </div>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">Sector</th>
                                <th className="text-left p-4">Area</th>
                                <th className="text-left p-4">Contact</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {businesses.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        No businesses found. Add your first business!
                                    </td>
                                </tr>
                            ) : (
                                businesses.map((business) => (
                                    <tr key={business.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{business.name}</td>
                                        <td className="p-4">{business.sector || '-'}</td>
                                        <td className="p-4">{business.area || '-'}</td>
                                        <td className="p-4 text-sm">
                                            {business.email && <div>{business.email}</div>}
                                            {business.phone && <div>{business.phone}</div>}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                business.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {business.isVerified ? 'Verified' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/businesses/${business.id}`}
                                                    className="p-2 text-primary hover:bg-primary/10 rounded"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(business.id)}
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

