"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Business } from "@/lib/types";
import {
    MagnifyingGlassIcon,
    PhoneIcon,
    GlobeAltIcon,
    CheckBadgeIcon,
    StarIcon
} from "@heroicons/react/24/outline";



export default function BusinessesPage() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sector, setSector] = useState("");

    useEffect(() => {
        const fetchBusinesses = async () => {
            setLoading(true);
            const { data } = await api.businesses.getAll({ sector: sector || undefined });
            setBusinesses(data || []);
            setLoading(false);
        };
        fetchBusinesses();
    }, [sector]);

    const filteredBusinesses = businesses.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden text-center md:text-left">
                <div className="absolute inset-0 bg-secondary -z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay -z-10"></div>

                <div className="container-custom">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Economic Hub
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display text-white mb-8 tracking-tighter">
                            Municipal <span className="text-primary italic">Business</span> Archive
                        </h1>
                        <p className="text-xl text-white/70 leading-relaxed font-light">
                            A curated directory of licensed enterprises contributing to the
                            growth and prosperity of the Sunyani Municipality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search & Filter - Glassmorphism */}
            <section className="relative -mt-12 z-10">
                <div className="container-custom">
                    <div className="glass-card p-2 rounded-2xl border border-white/20 shadow-2xl">
                        <div className="grid md:grid-cols-4 gap-2">
                            <div className="relative group flex-1">
                                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search by name or service..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border-none focus:ring-1 focus:ring-primary/50 text-secondary placeholder-gray-400 rounded-xl transition-all outline-none"
                                />
                            </div>
                            <select
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                                className="px-4 py-4 bg-white/5 border-none focus:ring-1 focus:ring-primary/50 text-secondary font-medium rounded-xl outline-none cursor-pointer"
                            >
                                <option value="">All Sectors</option>
                                <option value="retail">Retail & Commerce</option>
                                <option value="technology">Innovation & Tech</option>
                                <option value="hospitality">Tourism & Leisure</option>
                                <option value="agriculture">Agri-Business</option>
                            </select>
                            <select className="px-4 py-4 bg-white/5 border-none focus:ring-1 focus:ring-primary/50 text-secondary font-medium rounded-xl outline-none cursor-pointer">
                                <option value="">Municipal Areas</option>
                                <option value="central">Central District</option>
                                <option value="abesim">Abesim Enclave</option>
                                <option value="penkwase">Penkwase Zone</option>
                            </select>
                            <button className="gold-gradient text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2">
                                <MagnifyingGlassIcon className="w-5 h-5" />
                                Filter Results
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Listings */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-display text-secondary tracking-tight">Verified Enterprises</h2>
                            <p className="text-gray-500 mt-2">Displaying {filteredBusinesses.length} active licenses</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-96 bg-gray-50 animate-pulse rounded-3xl"></div>
                            ))
                        ) : filteredBusinesses.map((business) => (
                            <BusinessCard key={business.id} {...business} />
                        ))}
                    </div>

                    {/* Verification CTA */}
                    <div className="mt-24 p-12 rounded-3xl bg-secondary relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] group-hover:bg-primary/20 transition-all duration-700"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-xl text-center md:text-left">
                                <h3 className="text-3xl font-display text-white mb-4">List Your Enterprise</h3>
                                <p className="text-white/60 leading-relaxed font-light">
                                    Join the official municipal register to verify your business,
                                    gain public trust, and access exclusive growth resources.
                                </p>
                            </div>
                            <a href="/contact" className="btn-glass px-10 py-5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white hover:text-secondary transition-all">
                                Apply for Verification
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function BusinessCard({
    name,
    sector,
    area,
    description,
    phone,
    website,
    isVerified,
    rating,
}: any) {
    return (
        <div className="group bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500 relative flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-secondary font-display text-xl font-bold border border-gray-100 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                    {name.charAt(0)}
                </div>
                {isVerified && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                        <CheckBadgeIcon className="w-4 h-4" />
                        Verified
                    </div>
                )}
            </div>

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{sector}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{area}</span>
                </div>
                <h3 className="text-2xl font-display text-secondary mb-3 group-hover:text-primary transition-colors leading-tight">
                    {name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {description}
                </p>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-50 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-secondary transition-colors">
                        <PhoneIcon className="w-4 h-4" />
                        <span className="text-xs font-medium font-display">{phone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                        <StarIcon className="w-4 h-4 fill-current" />
                        <span className="text-xs font-bold">{rating.toFixed(1)}</span>
                    </div>
                </div>

                {website && (
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gray-50 text-secondary text-xs font-bold uppercase tracking-widest border border-gray-100 hover:bg-secondary hover:text-white transition-all group/btn"
                    >
                        <GlobeAltIcon className="w-4 h-4 group-hover/btn:animate-pulse" />
                        Digital Presence
                    </a>
                )}
            </div>
        </div>
    );
}
