'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { format } from 'date-fns';

interface NewsItem {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    category?: string;
    author?: string;
    isPublished: boolean;
    publishedAt?: string;
    views: number;
    createdAt: string;
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            const response = await api.news.getAll();
            setNews(response.data || []);
        } catch (error) {
            console.error('Failed to load news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this news article?')) return;
        try {
            await api.news.delete(id);
            loadNews();
        } catch (error) {
            alert('Failed to delete news article');
        }
    };

    if (loading) return <div>Loading news...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">News & Blog Management</h1>
                <Link href="/dashboard/news/new" className="btn btn-primary">
                    <PlusIcon className="w-5 h-5" />
                    Add News Article
                </Link>
            </div>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-4">Title</th>
                                <th className="text-left p-4">Category</th>
                                <th className="text-left p-4">Author</th>
                                <th className="text-left p-4">Published</th>
                                <th className="text-left p-4">Views</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-right p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-gray-500">
                                        No news articles found. Add your first article!
                                    </td>
                                </tr>
                            ) : (
                                news.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{item.title}</td>
                                        <td className="p-4">{item.category || '-'}</td>
                                        <td className="p-4">{item.author || '-'}</td>
                                        <td className="p-4 text-sm">
                                            {item.publishedAt
                                                ? format(new Date(item.publishedAt), 'MMM dd, yyyy')
                                                : format(new Date(item.createdAt), 'MMM dd, yyyy')}
                                        </td>
                                        <td className="p-4">{item.views}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${
                                                item.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {item.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/news/${item.id}`}
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

