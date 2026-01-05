'use client';

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Leadership', href: '/leadership' },
    { name: 'News', href: '/news' },
    { name: 'Businesses', href: '/businesses' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 gold-gradient"></div>
            <nav className="container-custom">
                <div className="glass-card bg-white/60 backdrop-blur-2xl border-white/20 px-6 lg:px-10 h-20 flex items-center justify-between">
                    {/* Typographic Branding */}
                    <Link href="/" className="group flex items-center gap-4">
                        <div className="h-10 w-0.5 gold-gradient rounded-full group-hover:h-12 transition-all duration-500"></div>
                        <div>
                            <div className="font-display text-2xl tracking-tighter text-secondary leading-none">
                                Sunyani<span className="text-primary font-light"> Municipal</span>
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/80 mt-1">
                                Bono Region, Ghana
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 ml-8 flex-1 justify-center">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[11px] font-bold uppercase tracking-widest text-secondary/70 hover:text-primary transition-all duration-300 relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gold-gradient transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/contact" className="hidden md:flex btn-primary px-6 py-2 text-sm">
                            Contact Office
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            className="lg:hidden p-2 text-secondary"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-2 glass-card bg-white/80 p-6 animate-slide-up">
                        <div className="flex flex-col gap-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg font-bold text-secondary hover:text-primary transition-colors flex items-center justify-between group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                    <div className="w-2 h-2 rounded-full border border-primary group-hover:bg-primary transition-all"></div>
                                </Link>
                            ))}
                            <Link href="/contact" className="btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>
                                Contact Office
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
