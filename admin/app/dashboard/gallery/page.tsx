'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface GalleryItem {
    id: string;
    title: string;
    mediaType: string;
    mediaUrl: string;
    category?: string;
    isPublished: boolean;
}

export default function GalleryPage() {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGallery();
    }, []);

    const loadGallery = async () => {
        try {
            const response = await api.gallery.getAll();
            setGallery(response.data || []);
        } catch (error) {
            console.error('Failed to load gallery:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this gallery item?')) return;
        try {
            await api.gallery.delete(id);
            loadGallery();
        } catch (error) {
            alert('Failed to delete gallery item');
        }
    };

    if (loading) return <div>Loading gallery...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
                <Link href="/dashboard/gallery/new" className="btn btn-primary">
                    <PlusIcon className="w-5 h-5" />
                    Add Item
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.length === 0 ? (
                    <div className="col-span-full text-center py-12 card">
                        <p className="text-gray-500">No gallery items found. Add your first item!</p>
                    </div>
                ) : (
                    gallery.map((item) => (
                        <div key={item.id} className="card">
                            <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                                {item.mediaType === 'image' ? (
                                    <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-gray-400">Video</span>
                                    </div>
                                )}
                            </div>
                            <h3 className="font-bold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{item.category || 'Uncategorized'}</p>
                            <div className="flex items-center justify-between">
                                <span className={`px-2 py-1 rounded text-xs ${
                                    item.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {item.isPublished ? 'Published' : 'Draft'}
                                </span>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/dashboard/gallery/${item.id}`}
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
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

