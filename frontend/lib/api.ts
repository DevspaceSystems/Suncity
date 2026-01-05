import { supabase } from './supabase';
import * as mockData from './data';

// Helper to convert snake_case to camelCase
function toCamel(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(v => toCamel(v));
    } else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [key.replace(/(_\w)/g, m => m[1].toUpperCase())]: toCamel(obj[key]),
            }),
            {},
        );
    }
    return obj;
}

// Helper to handle Supabase responses with mock fallback
async function handleSupabaseCall<T>(
    promise: any,
    fallback: T
): Promise<T> {
    try {
        const { data, error } = await promise;
        if (error || !data) {
            if (error) console.warn('Supabase error:', error);
            return fallback;
        }
        // If data is an empty array, consider using fallback
        if (Array.isArray(data) && data.length === 0) {
            console.log('Supabase returned empty array, using mock data.');
            return fallback;
        }
        return toCamel(data) as T;
    } catch (err) {
        console.error('Failed to fetch from Supabase:', err);
        return fallback;
    }
}

export const api = {
    // Leaders
    leaders: {
        getAll: async () => ({
            data: await handleSupabaseCall(
                supabase.from('leaders').select('*').order('order', { ascending: true }),
                mockData.leaders
            )
        }),
        getById: async (id: string) => ({
            data: await handleSupabaseCall(
                supabase.from('leaders').select('*').eq('id', id).single(),
                mockData.leaders.find(l => l.id === id) || mockData.leaders[0]
            )
        }),
    },

    // Businesses
    businesses: {
        getAll: async (params?: any) => {
            let query = supabase.from('businesses').select('*');
            if (params?.sector) query = query.eq('sector', params.sector);
            if (params?.isVerified) query = query.eq('is_verified', true);

            return {
                data: await handleSupabaseCall(
                    query.order('name', { ascending: true }),
                    mockData.businesses
                )
            };
        },
        getById: async (id: string) => ({
            data: await handleSupabaseCall(
                supabase.from('businesses').select('*').eq('id', id).single(),
                mockData.businesses.find(b => b.id === id) || mockData.businesses[0]
            )
        }),
        create: (data: any) => supabase.from('businesses').insert(data),
        update: (id: string, data: any) => supabase.from('businesses').update(data).eq('id', id),
        delete: (id: string) => supabase.from('businesses').delete().eq('id', id),
    },

    // Jobs
    jobs: {
        getAll: async (params?: any) => {
            let query = supabase.from('jobs').select('*');
            if (params?.jobType) query = query.eq('job_type', params.jobType);

            return {
                data: await handleSupabaseCall(
                    query.order('created_at', { ascending: false }),
                    mockData.jobs
                )
            };
        },
        getById: async (id: string) => ({
            data: await handleSupabaseCall(
                supabase.from('jobs').select('*').eq('id', id).single(),
                mockData.jobs.find(j => j.id === id) || mockData.jobs[0]
            )
        }),
        create: (data: any) => supabase.from('jobs').insert(data),
        update: (id: string, data: any) => supabase.from('jobs').update(data).eq('id', id),
        delete: (id: string) => supabase.from('jobs').delete().eq('id', id),
    },

    // Announcements
    announcements: {
        getAll: async (params?: any) => {
            let query = supabase.from('announcements').select('*');
            if (params?.isPublished !== undefined) query = query.eq('is_published', params.isPublished);

            return {
                data: await handleSupabaseCall(
                    query.order('published_at', { ascending: false }),
                    mockData.announcements
                )
            };
        },
        getById: async (id: string) => ({
            data: await handleSupabaseCall(
                supabase.from('announcements').select('*').eq('id', id).single(),
                mockData.announcements.find(a => a.id === id) || mockData.announcements[0]
            )
        }),
    },

    // Events
    events: {
        getAll: async (params?: any) => {
            let query = supabase.from('events').select('*');
            if (params?.isPublished !== undefined) query = query.eq('is_published', params.isPublished);

            return {
                data: await handleSupabaseCall(
                    query.order('start_date', { ascending: true }),
                    mockData.events
                )
            };
        },
        getById: async (id: string) => ({
            data: await handleSupabaseCall(
                supabase.from('events').select('*').eq('id', id).single(),
                mockData.events.find(e => e.id === id) || mockData.events[0]
            )
        }),
    },

    // Gallery
    gallery: {
        getAll: async (params?: any) => {
            let query = supabase.from('gallery').select('*');
            if (params?.isPublished !== undefined) query = query.eq('is_published', params.isPublished);

            return {
                data: await handleSupabaseCall(
                    query.order('created_at', { ascending: false }),
                    mockData.gallery
                )
            };
        },
        getById: async (id: string) => ({
            data: await handleSupabaseCall(
                supabase.from('gallery').select('*').eq('id', id).single(),
                mockData.gallery.find(g => g.id === id) || mockData.gallery[0]
            )
        }),
    },

    // News
    news: {
        getAll: async (params?: any) => {
            let query = supabase.from('news').select('*');
            if (params?.category) query = query.eq('category', params.category);
            if (params?.isPublished !== undefined) query = query.eq('is_published', params.isPublished);

            return {
                data: await handleSupabaseCall(
                    query.order('published_at', { ascending: false }),
                    mockData.news
                )
            };
        },
        getById: async (id: string) => ({
            data: await handleSupabaseCall(
                supabase.from('news').select('*').eq('id', id).single(),
                mockData.news.find(n => n.id === id) || mockData.news[0]
            )
        }),
        getBySlug: async (slug: string) => ({
            data: await handleSupabaseCall(
                supabase.from('news').select('*').eq('slug', slug).single(),
                mockData.news.find(n => n.slug === slug) || mockData.news[0]
            )
        }),
    },

    // Feedback
    feedback: {
        submit: (data: any) => supabase.from('feedback').insert(data),
    },

    // Auth
    auth: {
        login: (credentials: { email: string; password: string }) =>
            supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password
            }),
        register: (data: any) =>
            supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                        role: data.role || 'user'
                    }
                }
            }),
        logout: () => supabase.auth.signOut(),
        me: () => supabase.auth.getUser(),
    },
};
