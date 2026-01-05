"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    MegaphoneIcon,
    CalendarIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

export default function AnnouncementsPage() {
    const [announcementsList, setAnnouncementsList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setLoading(true);
            const { data } = await api.announcements.getAll();
            setAnnouncementsList(data || []);
            setLoading(false);
        };
        fetchAnnouncements();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-secondary -z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80')] opacity-5 mix-blend-overlay -z-10"></div>

                <div className="container-custom">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            Public Notices
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display text-white mb-8 tracking-tighter">
                            Official <span className="text-primary italic">Proclamations</span>
                        </h1>
                        <p className="text-xl text-white/70 leading-relaxed font-light">
                            Verified administrative notices, emergency alerts, and community
                            bulletins directly from the Municipal Secretariat.
                        </p>
                    </div>
                </div>
            </section>

            {/* List Section */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-12 gap-16">
                        {/* Featured High Priority */}
                        <div className="lg:col-span-12">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-12">Latest Broadcasts</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {loading ? (
                                    Array(3).fill(0).map((_, i) => (
                                        <div key={i} className="h-64 bg-gray-50 animate-pulse rounded-[40px]"></div>
                                    ))
                                ) : announcementsList.map((item) => (
                                    <AnnouncementCard
                                        key={item.id}
                                        {...item}
                                        onClick={() => setSelectedAnnouncement(item)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Modal */}
            {selectedAnnouncement && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-secondary/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setSelectedAnnouncement(null)}></div>
                    <div className="relative w-full max-w-4xl bg-white rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in slide-in-from-bottom-8 duration-700">
                        <button
                            onClick={() => setSelectedAnnouncement(null)}
                            className="absolute top-8 right-8 z-10 p-4 rounded-2xl bg-gray-50 text-secondary hover:bg-secondary hover:text-white transition-all shadow-lg"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <div className="grid md:grid-cols-2">
                            <div className="relative aspect-square md:aspect-auto">
                                <img
                                    src={selectedAnnouncement.imageUrl}
                                    className="w-full h-full object-cover"
                                    alt={selectedAnnouncement.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent"></div>
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className={`w-3 h-3 rounded-full ${selectedAnnouncement.priority === 'High' ? 'bg-red-500 animate-pulse' : 'bg-primary'}`}></div>
                                        <span className="text-white text-[10px] font-bold uppercase tracking-widest">{selectedAnnouncement.priority} Priority</span>
                                    </div>
                                    <h3 className="text-3xl font-display text-white tracking-tight">{selectedAnnouncement.title}</h3>
                                </div>
                            </div>
                            <div className="p-12 md:p-16 flex flex-col">
                                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-12">
                                    <CalendarIcon className="w-5 h-5 text-primary" />
                                    Broadcasted on {new Date(selectedAnnouncement.publishedAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'long', year: 'numeric' })}
                                </div>
                                <div className="flex-1 space-y-8">
                                    <div className="flex items-center gap-2 text-primary">
                                        <InformationCircleIcon className="w-6 h-6" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Official Content</span>
                                    </div>
                                    <p className="text-gray-500 text-lg leading-relaxed font-light whitespace-pre-wrap">
                                        {selectedAnnouncement.content}
                                    </p>
                                </div>
                                <div className="mt-12 pt-12 border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Seal of Authenticity</div>
                                    <div className="font-display text-secondary tracking-tighter">SUNYANI<span className="text-primary italic">MUNICIPAL</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function AnnouncementCard({ title, content, priority, category, publishedAt, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer bg-white p-10 rounded-[40px] border border-gray-100 hover:border-primary/30 hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500 relative overflow-hidden"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-12 -translate-y-12 rotate-45 ${priority === 'High' ? 'bg-red-50' : 'bg-primary/5'}`}></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${priority === 'High' ? 'bg-red-500 animate-pulse' : 'bg-primary'}`}></div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{category}</span>
                    </div>
                    {priority === 'High' && <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />}
                </div>

                <h3 className="text-2xl font-display text-secondary mb-6 group-hover:text-primary transition-colors leading-tight">
                    {title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8">
                    {content}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60">
                        <CalendarIcon className="w-4 h-4" />
                        {new Date(publishedAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short' })}
                    </div>
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">Read Notice →</span>
                </div>
            </div>
        </div>
    );
}
