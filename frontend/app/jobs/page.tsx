"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Job } from "@/lib/types";
import {
    BriefcaseIcon,
    MapPinIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    ArrowRightIcon
} from "@heroicons/react/24/outline";



export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState("All Roles");

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const typeParam = selectedType === "All Roles" ? undefined : selectedType;
            const { data } = await api.jobs.getAll({ jobType: typeParam });
            setJobs(data || []);
            setLoading(false);
        };
        fetchJobs();
    }, [selectedType]);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden text-center md:text-left">
                <div className="absolute inset-0 bg-secondary -z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay -z-10"></div>

                <div className="container-custom">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Public Careers
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display text-white mb-8 tracking-tighter">
                            Municipal <span className="text-primary italic">Career</span> Portal
                        </h1>
                        <p className="text-xl text-white/70 leading-relaxed font-light">
                            Empowering the citizens of Sunyani through official employment
                            opportunities and professional growth pathways.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="relative -mt-12 z-10">
                <div className="container-custom">
                    <div className="glass-card p-6 rounded-2xl border border-white/20 shadow-2xl flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Filter By:</span>
                            <div className="flex gap-2">
                                {["All Roles", "Full-time", "Contract", "Executive"].map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setSelectedType(filter)}
                                        className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedType === filter ? "bg-secondary text-white" : "border border-gray-100 text-gray-400 hover:border-primary/30 hover:text-primary"}`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="text-xs font-display text-secondary/50 italic">
                            {jobs.length} Active Vacancies
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="grid md:grid-cols-1 gap-6">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="h-48 bg-gray-50 animate-pulse rounded-3xl"></div>
                            ))
                        ) : jobs.map((job) => (
                            <JobListItem key={job.id} {...job} />
                        ))}
                    </div>

                    {/* Career Resources */}
                    <div className="mt-32">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-3xl font-display text-secondary tracking-tight">Career Development</h2>
                            <div className="h-px flex-1 bg-gray-100"></div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "Executive CV Design", desc: "Professional resume templates for government positions." },
                                { title: "Interview Excellence", desc: "Master the art of civic service interviews with our experts." },
                                { title: "Skill Acquisition", desc: "Certified training programs endorsed by the Assembly." }
                            ].map((item, idx) => (
                                <div key={idx} className="p-8 rounded-3xl border border-gray-100 hover:border-primary/30 transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-xl font-display text-secondary mb-4">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function JobListItem({
    title,
    company,
    location,
    jobType,
    salaryRange,
    deadline,
    description,
}: any) {
    return (
        <div className="group bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:shadow-secondary/5 transition-all duration-500 border-l-4 border-l-transparent hover:border-l-primary">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{company}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="px-3 py-1 rounded-full bg-secondary/5 text-secondary text-[10px] font-bold uppercase tracking-widest">{jobType}</span>
                    </div>
                    <h3 className="text-2xl font-display text-secondary mb-4 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col gap-4 md:items-end">
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4 text-primary" />
                            {location}
                        </div>
                        <div className="flex items-center gap-2">
                            <CurrencyDollarIcon className="w-4 h-4 text-primary" />
                            {salaryRange}
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            By {deadline}
                        </div>
                    </div>

                    <button className="flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-secondary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-secondary/10">
                        Apply for Role
                        <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
