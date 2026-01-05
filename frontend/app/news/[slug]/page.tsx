'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import Link from 'next/link';
import { CalendarIcon, EyeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface NewsItem {
    id: string;
    title: string;
    slug: string;
    content: string;
    imageUrl?: string;
    category?: string;
    author?: string;
    publishedAt?: string;
    views: number;
    tags?: string[];
}

export default function NewsDetailPage() {
    const params = useParams();
    const [news, setNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.slug) {
            loadNews();
        }
    }, [params.slug]);

    const loadNews = async () => {
        try {
            const response = await api.news.getBySlug(params.slug as string);
            setNews(response.data);
        } catch (error) {
            console.error('Failed to load news:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!news) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                    <Link href="/news" className="btn btn-primary">
                        Back to News
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            {news.imageUrl && (
                <section className="relative h-96 bg-gray-900">
                    <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 container-custom pb-8">
                        <Link href="/news" className="inline-flex items-center gap-2 text-white mb-4 hover:text-primary transition-colors">
                            <ArrowLeftIcon className="w-5 h-5" />
                            <span>Back to News</span>
                        </Link>
                        {news.category && (
                            <span className="inline-block bg-primary text-white text-sm px-4 py-1 rounded-full mb-4">
                                {news.category}
                            </span>
                        )}
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{news.title}</h1>
                        <div className="flex items-center gap-6 text-white/90 text-sm">
                            {news.publishedAt && (
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-5 h-5" />
                                    <span>{format(new Date(news.publishedAt), 'MMMM dd, yyyy')}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <EyeIcon className="w-5 h-5" />
                                <span>{news.views} views</span>
                            </div>
                            {news.author && (
                                <span>By {news.author}</span>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Article Content */}
            <article className="section">
                <div className="container-custom max-w-4xl">
                    {!news.imageUrl && (
                        <div className="mb-8">
                            <Link href="/news" className="inline-flex items-center gap-2 text-gray-600 mb-4 hover:text-primary transition-colors">
                                <ArrowLeftIcon className="w-5 h-5" />
                                <span>Back to News</span>
                            </Link>
                            {news.category && (
                                <span className="inline-block bg-primary text-white text-sm px-4 py-1 rounded-full mb-4">
                                    {news.category}
                                </span>
                            )}
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{news.title}</h1>
                            <div className="flex items-center gap-6 text-gray-600 text-sm mb-8">
                                {news.publishedAt && (
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="w-5 h-5" />
                                        <span>{format(new Date(news.publishedAt), 'MMMM dd, yyyy')}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <EyeIcon className="w-5 h-5" />
                                    <span>{news.views} views</span>
                                </div>
                                {news.author && (
                                    <span>By {news.author}</span>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
                        <div className="prose prose-lg max-w-none">
                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                {news.content}
                            </div>
                        </div>

                        {news.tags && news.tags.length > 0 && (
                            <div className="mt-8 pt-8 border-t">
                                <div className="flex flex-wrap gap-2">
                                    {news.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 text-center">
                        <Link href="/news" className="btn btn-primary">
                            <ArrowLeftIcon className="w-5 h-5" />
                            Back to All News
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}

