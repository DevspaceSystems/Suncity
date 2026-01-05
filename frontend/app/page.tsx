"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import {
    BuildingOfficeIcon,
    BriefcaseIcon,
    MegaphoneIcon,
    CalendarDaysIcon,
    PhotoIcon,
    MapPinIcon,
    ArrowRightIcon,
    CheckBadgeIcon
} from "@heroicons/react/24/outline";

export default function HomePage() {
    const [featuredLeaders, setFeaturedLeaders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaders = async () => {
            setLoading(true);
            const { data } = await api.leaders.getAll();
            setFeaturedLeaders(data?.slice(0, 2) || []);
            setLoading(false);
        };
        fetchLeaders();
    }, []);

    return (
        <div className="relative overflow-hidden">
            {/* High-End Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-32">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523438097204-575a40291d05?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 transform scale-110"></div>
                </div>

                <div className="container-custom relative z-20">
                    <div className="max-w-4xl">
                        <span className="kente-tag mb-6 inline-block">The Jewel of the Bono Region</span>
                        <h1 className="text-6xl md:text-8xl font-display text-secondary leading-[0.9] mb-8 animate-fade-in">
                            A Future-Ready <br />
                            <span className="text-primary italic font-light">Municipal Assembly</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary/70 mb-12 max-w-2xl leading-relaxed animate-slide-up">
                            Driving sustainable growth, cultural excellence, and modern infrastructure for the people of Sunyani.
                        </p>
                        <div className="flex flex-wrap gap-6 items-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                            <Link href="/about" className="btn-primary px-10">
                                Discover Our Vision
                            </Link>
                            <Link href="/businesses" className="group flex items-center gap-3 font-bold text-secondary hover:text-primary transition-all">
                                Explore Services <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Vertical Branding - Sophisticated Restoration */}
                <div className="absolute right-8 bottom-32 hidden xl:flex flex-col items-center gap-12 rotate-180 [writing-mode:vertical-lr] z-20">
                    <div className="w-0.5 h-24 gold-gradient"></div>
                    <div className="text-[11px] font-bold tracking-[0.8em] uppercase text-secondary/40 hover:text-primary transition-colors cursor-default whitespace-nowrap">
                        Governance • Culture • Innovation
                    </div>
                </div>
            </section>

            {/* Core Pillars Section - Governance, Culture, Innovation */}
            <section className="py-24 bg-white relative">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="group space-y-4">
                            <div className="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                <CheckBadgeIcon className="w-8 h-8 text-primary group-hover:text-white" />
                            </div>
                            <h3 className="text-2xl font-display text-secondary">Governance</h3>
                            <p className="text-secondary/60">Professional, transparent, and citizen-focused municipal leadership.</p>
                        </div>
                        <div className="group space-y-4">
                            <div className="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                <PhotoIcon className="w-8 h-8 text-primary group-hover:text-white" />
                            </div>
                            <h3 className="text-2xl font-display text-secondary">Culture</h3>
                            <p className="text-secondary/60">Preserving and celebrating the rich heritage of the Bono people.</p>
                        </div>
                        <div className="group space-y-4">
                            <div className="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                <MegaphoneIcon className="w-8 h-8 text-primary group-hover:text-white" />
                            </div>
                            <h3 className="text-2xl font-display text-secondary">Innovation</h3>
                            <p className="text-secondary/60">Leveraging digital solutions for modern infrastructure and services.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section - Professional & Presentable */}
            <section className="section bg-secondary text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 gold-gradient"></div>
                <div className="container-custom relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                            <h2 className="text-4xl md:text-5xl text-white mb-8 kente-underline">
                                Our Leadership
                            </h2>
                            <p className="text-lg text-white/70 mb-10 leading-relaxed">
                                Under the strategic direction of our Municipal leadership, we are building a legacy of
                                transparency and development that puts every citizen of Sunyani first.
                            </p>
                            <div className="space-y-6">
                                <LeadershipPoint text="Transparent Governance & Accountability" />
                                <LeadershipPoint text="Modern Infrastructure Development" />
                                <LeadershipPoint text="Economic Empowerment Initiatives" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {loading ? (
                                Array(2).fill(0).map((_, i) => (
                                    <div key={i} className="h-64 bg-white/5 animate-pulse rounded-2xl"></div>
                                ))
                            ) : featuredLeaders.map((leader) => (
                                <LeadershipCard
                                    key={leader.id}
                                    name={leader.name}
                                    title={leader.title}
                                    image={leader.imageUrl || ''}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Excellence - Glass Cards */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <h2 className="mb-6">Civic Services</h2>
                        <p className="text-secondary/60 text-lg">
                            Access critical information and resources designed to facilitate
                            growth and community well-being in our municipality.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <ServiceBox
                            icon={<BuildingOfficeIcon className="w-8 h-8" />}
                            title="Commerce Hub"
                            desc="Comprehensive business directory and investment resources."
                            link="/businesses"
                        />
                        <ServiceBox
                            icon={<BriefcaseIcon className="w-8 h-8" />}
                            title="Career Gateway"
                            desc="Connecting local talent with verified job opportunities."
                            link="/jobs"
                        />
                        <ServiceBox
                            icon={<MapPinIcon className="w-8 h-8" />}
                            title="Bono Tourism"
                            desc="Discover the rich cultural sites and natural beauty."
                            link="/tourism"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function LeadershipPoint({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-4 text-white/90">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <CheckBadgeIcon className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold">{text}</span>
        </div>
    );
}

function LeadershipCard({ name, title, image }: { name: string; title: string, image: string }) {
    return (
        <div className="glass-card bg-white/5 border-white/10 p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary bg-secondary/20 flex items-center justify-center">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-12 h-12 text-primary opacity-50">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                )}
            </div>
            <h4 className="text-white text-lg mb-1">{name}</h4>
            <div className="text-primary text-xs font-bold uppercase tracking-widest">{title}</div>
        </div>
    );
}

function ServiceBox({ icon, title, desc, link }: { icon: any; title: string; desc: string; link: string }) {
    return (
        <Link href={link} className="glass-card p-10 group hover:bg-secondary transition-all duration-500">
            <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                {icon}
            </div>
            <h3 className="text-2xl mb-4 group-hover:text-white transition-colors">
                {title}
            </h3>
            <p className="text-secondary/60 group-hover:text-white/60 transition-colors mb-8">
                {desc}
            </p>
            <div className="flex items-center gap-2 text-primary font-bold group-hover:text-white transition-colors">
                Explore <ArrowRightIcon className="w-4 h-4" />
            </div>
        </Link>
    );
}
