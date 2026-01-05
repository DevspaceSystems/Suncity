import Link from "next/link";
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon
} from "@heroicons/react/24/outline";

export default function Footer() {
    return (
        <footer className="bg-secondary text-white relative">
            <div className="absolute top-0 left-0 w-full h-1 gold-gradient opacity-50"></div>
            <div className="container-custom py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {/* Branding */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="font-display text-2xl tracking-tighter text-white leading-none mb-6">
                            Sunyani<span className="text-primary font-light"> Municipal</span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                            The official digital platform of Sunyani Municipal,
                            committed to excellence in local governance and community service.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-bold text-primary uppercase tracking-[0.2em] text-xs mb-8">Navigation</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">About Sunyani Municipal</Link></li>
                            <li><Link href="/leadership" className="text-white/70 hover:text-white transition-colors">Executive Leadership</Link></li>
                            <li><Link href="/news" className="text-white/70 hover:text-white transition-colors">Press Releases</Link></li>
                            <li><Link href="/events" className="text-white/70 hover:text-white transition-colors">Civic Events</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-primary uppercase tracking-[0.2em] text-xs mb-8">Civic Services</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/businesses" className="text-white/70 hover:text-white transition-colors">Business Licensing</Link></li>
                            <li><Link href="/jobs" className="text-white/70 hover:text-white transition-colors">Public Careers</Link></li>
                            <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Citizen Feedback</Link></li>
                            <li><Link href="/gallery" className="text-white/70 hover:text-white transition-colors">Municipal Archive</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-primary uppercase tracking-[0.2em] text-xs mb-8">Contact Office</h4>
                        <ul className="space-y-6 text-sm">
                            <li className="flex items-start gap-4">
                                <MapPinIcon className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-white/70 leading-relaxed">
                                    Municipal Complex, Sunyani<br />
                                    Bono Region, Ghana
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <PhoneIcon className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-white/70 font-display">+233 (0) 35 200 0000</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <EnvelopeIcon className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-white/70">it@sunyani.gov.gh</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">
                        © {new Date().getFullYear()} Sunyani Municipal • official portal
                    </div>
                    <div className="flex gap-8">
                        <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Privacy Policy</span>
                        <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Terms of Governance</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
