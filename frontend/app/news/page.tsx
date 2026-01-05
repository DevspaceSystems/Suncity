"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    CalendarIcon,
    EyeIcon,
    ArrowRightIcon,
    ShareIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NewsPage() {
    const [newsItems, setNewsItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All News");
    const categories = ["All News", "Governance", "Development", "Enforcement", "Civic"];

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const categoryParam = selectedCategory === "All News" ? undefined : selectedCategory;
            const { data } = await api.news.getAll({ category: categoryParam });
            setNewsItems(data || []);
            setLoading(false);
        };
        fetchNews();
    }, [selectedCategory]);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-40 overflow-hidden">
                <div className="absolute inset-0 bg-secondary -z-10"></div>
                <div className="absolute inset-0 gold-gradient-diagonal opacity-10 -z-10"></div>

                <div className="container-custom relative">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            Press Room
                        </div>
                        <h1 className="text-5xl md:text-8xl font-display text-white mb-8 tracking-tighter leading-none">
                            The <span className="text-primary italic">Sunyani</span> Gazette
                        </h1>
                        <p className="text-xl text-white/70 leading-relaxed font-light">
                            Official press releases, policy updates, and progress reports
                            directly from the Municipal Assembly.
                        </p>
                    </div>
                </div>

                {/* Categories - Overlapping */}
                <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 overflow-x-auto pb-4 scrollbar-hide">
                    <div className="container-custom flex gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`whitespace-nowrap px-8 py-5 rounded-2xl font-display text-sm font-bold tracking-tight shadow-2xl transition-all border ${selectedCategory === category
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-secondary border-gray-100 hover:border-primary/30"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Grid */}
            <section className="pt-40 pb-24">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-96 bg-gray-50 animate-pulse rounded-3xl"></div>
                            ))
                        ) : newsItems.map((item) => (
                            <NewsCard key={item.id} {...item} />
                        ))}
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="mt-32 p-16 rounded-[40px] bg-secondary relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="max-w-xl text-center lg:text-left">
                                <h2 className="text-4xl font-display text-white mb-6">Subscribe to Official Transmissions</h2>
                                <p className="text-white/60 leading-relaxed font-light">
                                    Receive verified news and emergency alerts directly from the
                                    Sunyani Municipal administration.
                                </p>
                            </div>
                            <div className="w-full max-w-md">
                                <form className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="Your official email"
                                        className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-primary transition-all"
                                    />
                                    <button className="gold-gradient px-10 py-5 rounded-2xl text-white font-bold text-sm tracking-widest uppercase shadow-xl hover:scale-105 transition-all">
                                        Join
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function NewsCard({
    title,
    excerpt,
    imageUrl,
    category,
    author,
    publishedAt,
    views,
    slug
}: any) {
    return (
        <article className="group relative flex flex-col h-full bg-white transition-all duration-500">
            <Link href={`/news/${slug}`} className="block overflow-hidden rounded-3xl mb-8 relative aspect-[16/10]">
                <img
                    src={imageUrl || "https://images.unsplash.com/photo-1541872703-74c5e44383f9?auto=format&fit=crop&q=80"}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">Read Publication</span>
                </div>
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-secondary text-[10px] font-bold uppercase tracking-widest">
                    {category}
                </div>
            </Link>

            <div className="flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    <div className="flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        {new Date(publishedAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                    <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                    <div className="flex items-center gap-1.5">
                        <EyeIcon className="w-4 h-4 text-primary" />
                        {views} Reads
                    </div>
                </div>

                <h3 className="text-2xl font-display text-secondary mb-6 group-hover:text-primary transition-colors leading-tight">
                    <Link href={`/news/${slug}`}>{title}</Link>
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-8">
                    {excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                            {author.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-secondary uppercase tracking-widest">{author}</span>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <ShareIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </article>
    );
}
