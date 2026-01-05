"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    CalendarIcon,
    MapPinIcon,
    UserGroupIcon,
    ArrowRightIcon,
    TicketIcon
} from "@heroicons/react/24/outline";

export default function EventsPage() {
    const [eventsList, setEventsList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const { data } = await api.events.getAll();
            setEventsList(data || []);
            setLoading(false);
        };
        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-secondary -z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80')] opacity-5 mix-blend-overlay -z-10"></div>

                <div className="container-custom">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            Civic Calendar
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display text-white mb-8 tracking-tighter">
                            Municipal <span className="text-primary italic">Events</span> & Ceremonies
                        </h1>
                        <p className="text-xl text-white/70 leading-relaxed font-light">
                            Your guide to the cultural, economic, and civic milestones
                            shaping the life and future of the Sunyani Municipality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="flex justify-between items-center mb-16">
                        <h2 className="text-3xl font-display text-secondary tracking-tight">Upcoming Engagements</h2>
                        <div className="hidden md:flex gap-4">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-1.5 rounded-full border border-gray-100">All Months</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-gray-50">Filtered by Venue</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-96 bg-gray-50 animate-pulse rounded-3xl"></div>
                            ))
                        ) : eventsList.map((event) => (
                            <EventCard key={event.id} {...event} />
                        ))}
                    </div>

                    {/* Past Events Reference */}
                    <div className="mt-32 pt-24 border-t border-gray-50">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                            <div className="max-w-md text-center md:text-left">
                                <h3 className="text-2xl font-display text-secondary mb-4">Event Archives</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Missed an official ceremony? Access our digital archive for photographs, speeches, and recordings of past municipal gatherings.
                                </p>
                            </div>
                            <button className="flex items-center gap-3 px-10 py-4 rounded-2xl border border-gray-100 text-secondary text-[10px] font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all group">
                                Browse Archive
                                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function EventCard({
    title,
    date,
    location,
    organizer,
    description,
    category,
    imageUrl,
}: any) {
    return (
        <div className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500 flex flex-col h-full">
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={imageUrl || "https://images.unsplash.com/photo-1540575861501-7ad060e39fe1?auto=format&fit=crop&q=80"}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 right-6">
                    <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-secondary text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        {category}
                    </span>
                </div>
                <div className="absolute bottom-6 left-6 flex gap-2">
                    <div className="px-3 py-1.5 rounded-xl bg-primary text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        {date.split(' ')[0]} {date.split(' ')[1]}
                    </div>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <MapPinIcon className="w-4 h-4 text-primary" />
                    {location}
                </div>

                <h3 className="text-2xl font-display text-secondary mb-4 group-hover:text-primary transition-colors leading-tight">
                    {title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {description}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60">
                        <UserGroupIcon className="w-4 h-4" />
                        {organizer}
                    </div>
                    <button className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest group/btn">
                        Get Details
                        <TicketIcon className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
