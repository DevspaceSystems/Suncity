"use client";

import { useState } from "react";
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ClockIcon,
    CheckCircleIcon
} from "@heroicons/react/24/outline";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-24 pb-12 overflow-hidden bg-secondary">
                <div className="absolute inset-0 bg-secondary -z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523438097204-575a40291d05?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay -z-10 bg-cover bg-center"></div>

                <div className="container-custom">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            Channel of Engagement
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display text-white mb-8 tracking-tighter">
                            Citizen <span className="text-primary italic">Direct</span> Line
                        </h1>
                        <p className="text-xl text-white/70 leading-relaxed font-light">
                            The official portal for civic feedback, administrative inquiries,
                            and community suggestions for the Municipal Assembly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-12 bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                        {/* Information Sidebar */}
                        <div className="lg:col-span-4 space-y-12">
                            <div>
                                <h2 className="text-3xl font-display text-secondary mb-12 tracking-tight">Official Channels</h2>
                                <div className="space-y-8">
                                    <ContactInfoItem
                                        icon={MapPinIcon}
                                        label="Municipal Complex"
                                        value="Sunyani, Bono Region, Ghana. PO Box 1234"
                                    />
                                    <ContactInfoItem
                                        icon={PhoneIcon}
                                        label="Public Relations"
                                        value="+233 (0) 35 200 0000"
                                    />
                                    <ContactInfoItem
                                        icon={EnvelopeIcon}
                                        label="Official Correspondence"
                                        value="info@sunyani.gov.gh"
                                    />
                                    <ContactInfoItem
                                        icon={ClockIcon}
                                        label="Operating Hours"
                                        value="Mon - Fri: 08:30 - 17:00"
                                    />
                                </div>
                            </div>

                            <div className="p-12 rounded-[40px] bg-primary/5 border border-primary/10">
                                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">Emergency Response</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    For urgent safety issues or municipal emergencies, please use our 24/7 dedicated line.
                                </p>
                                <div className="text-2xl font-display text-primary">+233 24 112 0000</div>
                            </div>
                        </div>

                        {/* Form Area */}
                        <div className="lg:col-span-8">
                            <div className="relative p-1 bg-white rounded-[40px] shadow-2xl shadow-secondary/5 border border-gray-100">
                                {submitted ? (
                                    <div className="flex flex-col items-center justify-center py-32 px-12 text-center animate-in fade-in zoom-in duration-700">
                                        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-8">
                                            <CheckCircleIcon className="w-12 h-12" />
                                        </div>
                                        <h3 className="text-4xl font-display text-secondary mb-4">Message Transmitted</h3>
                                        <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md mx-auto mb-12">
                                            Your communication has been securely logged with the Municipal Secretariat.
                                            We will respond via your provided email within 48 business hours.
                                        </p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="px-10 py-4 rounded-2xl bg-secondary text-white font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="p-12 space-y-12">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">Full Name</label>
                                                <input
                                                    required
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    type="text"
                                                    placeholder="e.g. Samuel Ameyaw"
                                                    className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 text-secondary placeholder-gray-300 outline-none focus:border-primary focus:bg-white transition-all"
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">Email Address</label>
                                                <input
                                                    required
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    type="email"
                                                    placeholder="samuel@example.com"
                                                    className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 text-secondary placeholder-gray-300 outline-none focus:border-primary focus:bg-white transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">Nature of Inquiry</label>
                                            <select
                                                value={formData.subject}
                                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 text-secondary outline-none focus:border-primary focus:bg-white appearance-none transition-all cursor-pointer"
                                            >
                                                <option>General Inquiry</option>
                                                <option>Business Licensing</option>
                                                <option>Infrastructure Feedback</option>
                                                <option>Waste Management Issue</option>
                                                <option>Other Civic Matters</option>
                                            </select>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] ml-2">Message Content</label>
                                            <textarea
                                                required
                                                value={formData.message}
                                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                                rows={6}
                                                placeholder="Please provide detailed information regarding your inquiry..."
                                                className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 text-secondary placeholder-gray-300 outline-none focus:border-primary focus:bg-white transition-all resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full gold-gradient py-6 rounded-2xl text-white font-bold text-xs uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-4"
                                        >
                                            {loading ? "Transmitting..." : "Send Official Message"}
                                            {!loading && <CheckCircleIcon className="w-5 h-5" />}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ContactInfoItem({ icon: Icon, label, value }: any) {
    return (
        <div className="flex gap-6 group">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-secondary font-medium">{value}</div>
            </div>
        </div>
    );
}
