import type { Metadata } from "next";
import {
    AcademicCapIcon,
    GlobeAltIcon,
    HomeModernIcon,
    SparklesIcon
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
    title: "About Sunyani | Sunyani Municipal",
    description: "Learn about the history, culture, geography, and heritage of Sunyani, the capital of Bono Region, Ghana.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-40 overflow-hidden">
                <div className="absolute inset-0 bg-secondary -z-10"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541872703-74c5e44383f9?auto=format&fit=crop&q=80')] opacity-10 mix-blend-overlay -z-10"></div>

                <div className="container-custom relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-8">
                            Heritage & Legacy
                        </div>
                        <h1 className="text-6xl md:text-9xl font-display text-white mb-12 tracking-tighter leading-none">
                            The Heart of <span className="text-primary italic">Bono</span>
                        </h1>
                        <p className="text-2xl text-white/70 leading-relaxed font-light max-w-2xl mx-auto">
                            Discover the rich history, vibrant culture, and visionary future
                            of Ghana's most prestigious municipal capital.
                        </p>
                    </div>
                </div>
            </section>

            {/* History - Split Layout */}
            <section className="py-32 relative overflow-hidden">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-1 w-12 bg-primary"></div>
                                <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Historical Narrative</span>
                            </div>
                            <h2 className="text-5xl font-display text-secondary mb-12 tracking-tight">A Legacy of <span className="text-primary">Awakening</span></h2>
                            <div className="space-y-8 text-gray-500 text-lg leading-relaxed font-light">
                                <p>
                                    Sunyani stands as a testament to the resilience and vision of the Asona clan.
                                    The name itself—derived from "Asona" and "Nyan"—speaks to a place of perpetual
                                    awakening and progress.
                                </p>
                                <p>
                                    From its beginnings as a strategic pre-colonial trading post to its current status
                                    as the administrative heart of the Bono Region, Sunyani has always been a beacon
                                    of commerce and cultural integration.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gray-50 rounded-[60px] -z-10 transform rotate-2"></div>
                            <div className="bg-white border border-gray-100 rounded-[60px] p-12 shadow-2xl shadow-secondary/5">
                                <h3 className="text-2xl font-display text-secondary mb-12">Municipal Milestones</h3>
                                <ul className="space-y-12">
                                    {[
                                        { year: "1960", label: "Municipal Status", desc: "Officially declared the administrative capital." },
                                        { year: "1954", label: "Regional Hub", desc: "Designated as the commercial center of Bono." },
                                        { year: "Pres.", label: "Innovation Leader", desc: "Ranked as the cleanest and most organized city in Ghana." }
                                    ].map((milestone) => (
                                        <li key={milestone.year} className="flex gap-8 group">
                                            <div className="text-primary font-display text-2xl font-bold opacity-30 group-hover:opacity-100 transition-opacity">{milestone.year}</div>
                                            <div>
                                                <h4 className="text-secondary font-bold text-sm uppercase tracking-widest mb-2">{milestone.label}</h4>
                                                <p className="text-gray-400 text-sm leading-relaxed">{milestone.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Geography - Data Oriented */}
            <section className="py-32 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="container-custom relative z-10">
                    <div className="max-w-2xl mb-24">
                        <h2 className="text-5xl font-display text-white mb-8 tracking-tight">Geographic <span className="text-primary italic">Precision</span></h2>
                        <p className="text-white/50 text-xl font-light leading-relaxed">
                            Strategically located in the forest-savanna transitional zone, Sunyani
                            offers a unique ecological balance that fosters both agriculture and modern industry.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            { icon: GlobeAltIcon, label: "Total Area", value: "506.7", unit: "km²" },
                            { icon: AcademicCapIcon, label: "Elevation", value: "310", unit: "meters" },
                            { icon: HomeModernIcon, label: "Zones", value: "12", unit: "Districts" },
                            { icon: SparklesIcon, label: "Climate", value: "26.5", unit: "°C Avg" }
                        ].map((stat) => (
                            <div key={stat.label} className="p-12 rounded-[40px] bg-white/5 border border-white/10 group hover:bg-white hover:border-white transition-all duration-700">
                                <stat.icon className="w-8 h-8 text-primary mb-8 group-hover:scale-110 transition-transform" />
                                <div className="text-white group-hover:text-secondary transition-colors">
                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-50">{stat.label}</div>
                                    <div className="text-5xl font-display tracking-tighter tabular-nums mb-1">{stat.value}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-primary">{stat.unit}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Attractions - Visual Grid */}
            <section className="py-32">
                <div className="container-custom">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl font-display text-secondary tracking-tight">Points of <span className="text-primary italic">Excellence</span></h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Central Market", tag: "Trade", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80" },
                            { name: "Coronation Park", tag: "Civic", img: "https://images.unsplash.com/photo-1541872703-74c5e44383f9?auto=format&fit=crop&q=80" },
                            { name: "Regional Museum", tag: "Culture", img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80" },
                            { name: "Craft Centers", tag: "Arts", img: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80" }
                        ].map((item) => (
                            <div key={item.name} className="group cursor-pointer">
                                <div className="relative aspect-[3/4] rounded-[30px] overflow-hidden mb-6 shadow-xl">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                        <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">{item.tag}</div>
                                        <div className="text-white font-display text-xl">{item.name}</div>
                                    </div>
                                </div>
                                <h4 className="text-secondary font-bold text-sm uppercase tracking-widest text-center group-hover:text-primary transition-colors">{item.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
