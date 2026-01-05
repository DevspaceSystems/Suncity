"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
    PhotoIcon,
    ArrowsPointingOutIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

export default function GalleryPage() {
    const [galleryItems, setGalleryItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const fetchGallery = async () => {
            setLoading(true);
            const { data } = await api.gallery.getAll();
            setGalleryItems(data || []);
            setLoading(false);
        };
        fetchGallery();
    }, []);

    const categories = ["All", ...new Set(galleryItems.map(item => item.category))];
    const filteredGallery = filter === "All"
        ? galleryItems
        : galleryItems.filter(item => item.category === filter);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-secondary -z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80')] opacity-5 mix-blend-overlay -z-10"></div>

                <div className="container-custom">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                            Visual Chronicles
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display text-white mb-8 tracking-tighter">
                            A Portrait of <span className="text-primary italic">Prosperity</span>
                        </h1>
                        <p className="text-xl text-white/70 leading-relaxed font-light">
                            Documenting the growth, culture, and natural beauty of the
                            Sunyani Municipality through professional photography.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 border-b border-gray-50 sticky top-20 bg-white/80 backdrop-blur-md z-40">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${filter === cat
                                    ? "bg-secondary text-white shadow-xl shadow-secondary/10"
                                    : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-secondary"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-24">
                <div className="container-custom">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {Array(6).fill(0).map((_, i) => (
                                <div key={i} className="h-64 bg-gray-50 animate-pulse rounded-[40px]"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                            {filteredGallery.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedImage(item)}
                                    className="relative group cursor-pointer break-inside-avoid rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 hover:scale-[1.02]"
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-12">
                                        <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">{item.category}</div>
                                        <h3 className="text-2xl font-display text-white mb-4 tracking-tighter">{item.title}</h3>
                                        <div className="flex justify-between items-center">
                                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
                                                <PhotoIcon className="w-5 h-5" />
                                            </div>
                                            <ArrowsPointingOutIcon className="w-6 h-6 text-white opacity-50" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12">
                    <div className="absolute inset-0 bg-secondary/95 backdrop-blur-2xl animate-in fade-in duration-500" onClick={() => setSelectedImage(null)}></div>
                    <div className="relative w-full max-w-7xl h-full flex flex-col animate-in zoom-in duration-700">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-0 right-0 p-4 text-white/50 hover:text-white transition-colors"
                        >
                            <XMarkIcon className="w-12 h-12" />
                        </button>
                        <div className="flex-1 flex items-center justify-center overflow-hidden">
                            <img
                                src={selectedImage.imageUrl}
                                alt={selectedImage.title}
                                className="max-w-full max-h-full object-contain rounded-[40px] shadow-2xl"
                            />
                        </div>
                        <div className="py-12 text-center">
                            <div className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">{selectedImage.category}</div>
                            <h2 className="text-4xl font-display text-white tracking-widest leading-none">{selectedImage.title}</h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
