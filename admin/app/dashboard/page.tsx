'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import {
    UserGroupIcon,
    BuildingOfficeIcon,
    BriefcaseIcon,
    MegaphoneIcon,
    CalendarIcon,
    PhotoIcon,
    ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            // For now, we'll fetch counts from individual endpoints
            const [leaders, businesses, jobs, announcements, events, gallery, feedback] = await Promise.all([
                api.leaders.getAll().catch(() => ({ data: [] })),
                api.businesses.getAll().catch(() => ({ data: [] })),
                api.jobs.getAll().catch(() => ({ data: [] })),
                api.announcements.getAll().catch(() => ({ data: [] })),
                api.events.getAll().catch(() => ({ data: [] })),
                api.gallery.getAll().catch(() => ({ data: [] })),
                api.feedback.getAll().catch(() => ({ data: [] })),
            ]);

            setStats({
                leaders: leaders.data?.length || 0,
                businesses: businesses.data?.length || 0,
                jobs: jobs.data?.length || 0,
                announcements: announcements.data?.length || 0,
                events: events.data?.length || 0,
                gallery: gallery.data?.length || 0,
                feedback: feedback.data?.length || 0,
            });
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { name: 'Leaders', value: stats?.leaders || 0, icon: UserGroupIcon, color: 'primary' },
        { name: 'Businesses', value: stats?.businesses || 0, icon: BuildingOfficeIcon, color: 'secondary' },
        { name: 'Jobs', value: stats?.jobs || 0, icon: BriefcaseIcon, color: 'accent' },
        { name: 'Announcements', value: stats?.announcements || 0, icon: MegaphoneIcon, color: 'primary' },
        { name: 'Events', value: stats?.events || 0, icon: CalendarIcon, color: 'secondary' },
        { name: 'Gallery Items', value: stats?.gallery || 0, icon: PhotoIcon, color: 'accent' },
        { name: 'Feedback Messages', value: stats?.feedback || 0, icon: ChatBubbleLeftRightIcon, color: 'primary' },
    ];

    if (loading) {
        return <div>Loading dashboard...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.name} className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{stat.name}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                                <stat.icon className={`w-8 h-8 text-${stat.color}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

