'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    HomeIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    BriefcaseIcon,
    MegaphoneIcon,
    CalendarIcon,
    PhotoIcon,
    ChatBubbleLeftRightIcon,
    ArrowRightOnRectangleIcon,
    NewspaperIcon,
} from '@heroicons/react/24/outline';
import { api } from '@/lib/api';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Content', href: '/dashboard/content', icon: MegaphoneIcon },
    { name: 'News/Blog', href: '/dashboard/news', icon: NewspaperIcon },
    { name: 'Leadership', href: '/dashboard/leadership', icon: UserGroupIcon },
    { name: 'Businesses', href: '/dashboard/businesses', icon: BuildingOfficeIcon },
    { name: 'Jobs', href: '/dashboard/jobs', icon: BriefcaseIcon },
    { name: 'Announcements', href: '/dashboard/announcements', icon: MegaphoneIcon },
    { name: 'Events', href: '/dashboard/events', icon: CalendarIcon },
    { name: 'Gallery', href: '/dashboard/gallery', icon: PhotoIcon },
    { name: 'Feedback', href: '/dashboard/feedback', icon: ChatBubbleLeftRightIcon },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            await api.auth.me();
            setAuthenticated(true);
        } catch {
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!authenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b">
                        <h1 className="text-xl font-bold text-secondary">Sunyani Municipal</h1>
                        <p className="text-sm text-gray-600">Admin Dashboard</p>
                    </div>

                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-primary text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64">
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

