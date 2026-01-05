import { supabase } from './supabase';

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

// Helper to handle Supabase responses
async function handleResponse(promise: any) {
    const { data, error } = await promise;
    if (error) throw error;
    return { data: toCamel(data) };
}

// API endpoints
export const api = {
    // Auth
    auth: {
        login: async (credentials: { email: string; password: string }) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password
            });
            if (error) throw error;
            return {
                data: {
                    user: toCamel(data.user),
                    access_token: data.session?.access_token
                }
            };
        },
        register: async (data: { email: string; password: string; fullName: string; phone?: string }) => {
            const { data: authData, error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                        phone: data.phone,
                        role: 'admin' // Default to admin for now, or match logic
                    }
                }
            });
            if (error) throw error;
            return {
                data: {
                    user: toCamel(authData.user),
                    session: authData.session,
                    access_token: authData.session?.access_token
                }
            };
        },
        logout: () => supabase.auth.signOut(),
        me: async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) throw error;
            return { data: toCamel(data.user) };
        },
    },

    // Leaders
    leaders: {
        getAll: () => handleResponse(supabase.from('leaders').select('*').order('order', { ascending: true })),
        getById: (id: string) => handleResponse(supabase.from('leaders').select('*').eq('id', id).single()),
        create: (data: any) => handleResponse(supabase.from('leaders').insert(data)),
        update: (id: string, data: any) => handleResponse(supabase.from('leaders').update(data).eq('id', id)),
        delete: (id: string) => handleResponse(supabase.from('leaders').delete().eq('id', id)),
    },

    // Businesses
    businesses: {
        getAll: (params?: any) => {
            let query = supabase.from('businesses').select('*');
            if (params?.sector) query = query.eq('sector', params.sector);
            return handleResponse(query.order('name', { ascending: true }));
        },
        getById: (id: string) => handleResponse(supabase.from('businesses').select('*').eq('id', id).single()),
        create: (data: any) => handleResponse(supabase.from('businesses').insert(data)),
        update: (id: string, data: any) => handleResponse(supabase.from('businesses').update(data).eq('id', id)),
        delete: (id: string) => handleResponse(supabase.from('businesses').delete().eq('id', id)),
    },

    // Jobs
    jobs: {
        getAll: (params?: any) => {
            let query = supabase.from('jobs').select('*');
            if (params?.jobType) query = query.eq('job_type', params.jobType);
            return handleResponse(query.order('created_at', { ascending: false }));
        },
        getById: (id: string) => handleResponse(supabase.from('jobs').select('*').eq('id', id).single()),
        create: (data: any) => handleResponse(supabase.from('jobs').insert(data)),
        update: (id: string, data: any) => handleResponse(supabase.from('jobs').update(data).eq('id', id)),
        delete: (id: string) => handleResponse(supabase.from('jobs').delete().eq('id', id)),
    },

    // Announcements
    announcements: {
        getAll: (params?: any) => {
            let query = supabase.from('announcements').select('*');
            if (params?.isPublished !== undefined) query = query.eq('is_published', params.isPublished);
            return handleResponse(query.order('published_at', { ascending: false }));
        },
        getById: (id: string) => handleResponse(supabase.from('announcements').select('*').eq('id', id).single()),
        create: (data: any) => handleResponse(supabase.from('announcements').insert(data)),
        update: (id: string, data: any) => handleResponse(supabase.from('announcements').update(data).eq('id', id)),
        delete: (id: string) => handleResponse(supabase.from('announcements').delete().eq('id', id)),
    },

    // Events
    events: {
        getAll: (params?: any) => {
            let query = supabase.from('events').select('*');
            if (params?.isPublished !== undefined) query = query.eq('is_published', params.isPublished);
            return handleResponse(query.order('start_date', { ascending: true }));
        },
        getById: (id: string) => handleResponse(supabase.from('events').select('*').eq('id', id).single()),
        create: (data: any) => handleResponse(supabase.from('events').insert(data)),
        update: (id: string, data: any) => handleResponse(supabase.from('events').update(data).eq('id', id)),
        delete: (id: string) => handleResponse(supabase.from('events').delete().eq('id', id)),
    },

    // Gallery
    gallery: {
        getAll: (params?: any) => {
            let query = supabase.from('gallery').select('*');
            if (params?.isPublished !== undefined) query = query.eq('is_published', params.isPublished);
            return handleResponse(query.order('created_at', { ascending: false }));
        },
        getById: (id: string) => handleResponse(supabase.from('gallery').select('*').eq('id', id).single()),
        create: (data: any) => handleResponse(supabase.from('gallery').insert(data)),
        update: (id: string, data: any) => handleResponse(supabase.from('gallery').update(data).eq('id', id)),
        delete: (id: string) => handleResponse(supabase.from('gallery').delete().eq('id', id)),
    },

    // Feedback
    feedback: {
        getAll: (params?: any) => handleResponse(supabase.from('feedback').select('*').order('created_at', { ascending: false })),
        getById: (id: string) => handleResponse(supabase.from('feedback').select('*').eq('id', id).single()),
        updateStatus: (id: string, status: string) => handleResponse(supabase.from('feedback').update({ status }).eq('id', id)),
        delete: (id: string) => handleResponse(supabase.from('feedback').delete().eq('id', id)),
    },

    // Dashboard Stats
    dashboard: {
        getStats: async () => {
            const [
                { count: businessCount },
                { count: jobCount },
                { count: eventCount },
                { count: announcementCount }
            ] = await Promise.all([
                supabase.from('businesses').select('*', { count: 'exact', head: true }),
                supabase.from('jobs').select('*', { count: 'exact', head: true }),
                supabase.from('events').select('*', { count: 'exact', head: true }),
                supabase.from('announcements').select('*', { count: 'exact', head: true })
            ]);

            return {
                data: {
                    businesses: businessCount || 0,
                    jobs: jobCount || 0,
                    events: eventCount || 0,
                    announcements: announcementCount || 0
                }
            };
        },
    },

    // News
    news: {
        getAll: (params?: any) => {
            let query = supabase.from('news').select('*');
            if (params?.category) query = query.eq('category', params.category);
            return handleResponse(query.order('published_at', { ascending: false }));
        },
        getById: (id: string) => handleResponse(supabase.from('news').select('*').eq('id', id).single()),
        create: (data: any) => handleResponse(supabase.from('news').insert(data)),
        update: (id: string, data: any) => handleResponse(supabase.from('news').update(data).eq('id', id)),
        delete: (id: string) => handleResponse(supabase.from('news').delete().eq('id', id)),
    },
};
