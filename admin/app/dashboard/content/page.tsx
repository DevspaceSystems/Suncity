'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface PageContent {
    id: string;
    page: string;
    section: string;
    title?: string;
    content: string;
    imageUrl?: string;
    order: number;
    isActive: boolean;
}

export default function ContentManagementPage() {
    const [content, setContent] = useState<PageContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPage, setSelectedPage] = useState<string>('all');

    const pages = ['all', 'home', 'about', 'leadership', 'businesses', 'jobs', 'events', 'gallery', 'contact'];

    useEffect(() => {
        loadContent();
    }, [selectedPage]);

    const loadContent = async () => {
        try {
            const params = selectedPage !== 'all' ? { page: selectedPage } : {};
            const response = await api.pageContent.getAll(params);
            setContent(response.data || []);
        } catch (error) {
            console.error('Failed to load content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this content?')) return;

        try {
            await api.pageContent.delete(id);
            loadContent();
        } catch (error) {
            alert('Failed to delete content');
        }
    };

    if (loading) {
        return <div>Loading content...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
                <Link href="/dashboard/content/new" className="btn btn-primary">
                    <PlusIcon className="w-5 h-5" />
                    Add Content
                </Link>
            </div>

            <div className="mb-6">
                <div className="flex gap-2 flex-wrap">
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setSelectedPage(page)}
                            className={`px-4 py-2 rounded ${
                                selectedPage === page
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {page.charAt(0).toUpperCase() + page.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4">Page</th>
                                <th className="text-left p-4">Section</th>
                                <th className="text-left p-4">Title</th>
                                <th className="text-left p-4">Preview</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        No content found. Add your first content section!
                                    </td>
                                </tr>
                            ) : (
                                content.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{item.page}</td>
                                        <td className="p-4">{item.section}</td>
                                        <td className="p-4">{item.title || '-'}</td>
                                        <td className="p-4">
                                            <div className="max-w-xs truncate text-sm text-gray-600">
                                                {item.content.substring(0, 100)}...
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                item.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {item.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/content/${item.id}`}
                                                    className="p-2 text-primary hover:bg-primary/10 rounded"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
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

