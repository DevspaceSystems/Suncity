"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    EnvelopeIcon,
    LinkIcon,
    ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

export default function LeadershipPage() {
    const [leadersList, setLeadersList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaders = async () => {
            setLoading(true);
            const { data } = await api.leaders.getAll();
            setLeadersList(data || []);
            setLoading(false);
        };
        fetchLeaders();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden text-center md:text-left">
                <div className="absolute inset-0 bg-secondary -z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80')] opacity-5 mix-blend-overlay -z-10"></div>

                <div className="container-custom">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            Executive Council
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display text-white mb-8 tracking-tighter">
                            Municipal <span className="text-primary italic">Leadership</span>
                        </h1>
                        <p className="text-xl text-white/70 leading-relaxed font-light">
                            A dedicated team of visionary leaders committed to the sustainable
                            development and governance of Sunyani Municipality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Leadership Grid */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="aspect-[4/5] bg-gray-50 animate-pulse rounded-[40px]"></div>
                            ))
                        ) : leadersList.map((leader) => (
                            <LeaderCard key={leader.id} {...leader} />
                        ))}
                    </div>

                    {/* Governance Philosophy */}
                    <div className="mt-32 p-16 rounded-[40px] bg-gray-50 border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px]"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-display text-secondary mb-12 tracking-tight">Our Core Values</h2>
                            <div className="grid md:grid-cols-4 gap-12">
                                {[
                                    { label: "Transparency", desc: "Open and accountable governance." },
                                    { label: "Innovation", desc: "Digital-first municipal services." },
                                    { label: "Community", desc: "People-centered decision making." },
                                    { label: "Prosperity", desc: "Economic growth for all citizens." }
                                ].map((value) => (
                                    <div key={value.label}>
                                        <h3 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">{value.label}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function LeaderCard({
    name,
    title,
    position,
    constituency,
    imageUrl,
    message,
}: any) {
    return (
        <div className="group relative">
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden mb-8 shadow-2xl transition-all duration-700 group-hover:scale-[1.02]">
                <img
                    src={imageUrl || "https://images.unsplash.com/photo-1540560083274-142fef80379d?auto=format&fit=crop&q=80"}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute bottom-8 left-8 right-8">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">{title}</div>
                    <h3 className="text-2xl font-display text-white mb-2 tracking-tight">{name}</h3>
                    <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{position}</div>
                </div>
            </div>

            <div className="px-4">
                <div className="flex items-center gap-2 mb-4">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-primary" />
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Leadership Message</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed italic mb-8">
                    "{message}"
                </p>
                <div className="flex gap-4">
                    <button className="flex items-center justify-center p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-secondary hover:text-white transition-all">
                        <EnvelopeIcon className="w-5 h-5" />
                    </button>
                    <button className="flex items-center justify-center p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-secondary hover:text-white transition-all">
                        <LinkIcon className="w-5 h-5" />
                    </button>
                    <div className="h-11 flex-1 flex items-center px-6 rounded-full bg-secondary text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-secondary/10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        View Full Profile
                    </div>
                </div>
            </div>
        </div>
    );
}
