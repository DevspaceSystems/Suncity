export interface Business {
    id: string;
    name: string;
    description?: string;
    sector?: string;
    area?: string;
    logoUrl?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    website?: string;
    address?: string;
    isVerified?: boolean;
    rating?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface Job {
    id: string;
    title: string;
    company?: string;
    companyName?: string;
    description?: string;
    requirements?: string;
    location?: string;
    jobType?: string;
    salaryRange?: string;
    applicationEmail?: string;
    applicationUrl?: string;
    deadline?: Date | string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    category?: string;
    priority?: string;
    imageUrl?: string;
    isPublished?: boolean;
    publishedAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface Event {
    id: string;
    title: string;
    description?: string;
    location?: string;
    startDate?: Date | string;
    endDate?: Date | string;
    imageUrl?: string;
    organizer?: string;
    contactInfo?: string;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface GalleryItem {
    id: string;
    title: string;
    description?: string;
    mediaType?: string;
    mediaUrl?: string;
    thumbnailUrl?: string;
    category?: string;
    isPublished?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface Feedback {
    type: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    avatarUrl?: string;
    role?: {
        id: string;
        name: string;
    };
    isActive?: boolean;
    emailVerified?: boolean;
}
