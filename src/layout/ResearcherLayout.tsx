import { useEffect } from "react";
import { getUserProfile } from "../services/user/userService";
import { Link, useLocation } from "react-router";
import { ReactNode, useState, useCallback } from "react";
import { UserProfile } from "../services/user/userService";
import PublicHeader from "../components/publicHeader/PublicHeader";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

interface ResearcherLayoutProps {
    children: ReactNode;
    user: UserProfile;
    heading?: string
}

const navLinks = [
    { label: "General Info", path: "/researcher-details" },
    { label: "Education", path: "/researcher-details/education" },
    { label: "Research Areas", path: "/researcher-details/areas" },
    { label: "Experience", path: "/researcher-details/experience" },
    { label: "Resume (CV)", path: "/researcher-details/cv" },
    { label: "Contact", path: "/researcher-details/contact" },
];

export default function ResearcherLayout({ children, user, heading }: ResearcherLayoutProps) {
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [imageBase64, setImageBase64] = useState<string>("");
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        getUserProfile(user?.fin_kod ? user?.fin_kod : "")
            .then((res) => {
                if (typeof res === "object") {
                    setImageBase64(res.profile_image ? `data:image/jpeg;base64,${res.profile_image}` : "");
                } else {
                    setImageBase64("");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user?.fin_kod]);

    const particlesInit = useCallback(async (engine: any) => {
        await loadFull(engine);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-slate-950 transition-colors duration-300">
            <PublicHeader toggleMenu={() => setMenuOpen(!menuOpen)} />

            <div className="flex flex-col md:flex-row flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
                {/* ── Sidebar ────────────────────────────────────────── */}
                <aside className="w-full md:w-80 flex-shrink-0">
                    <div className="sticky top-24 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
                            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                                <div className="absolute inset-0 opacity-10 bg-[url('/aztu-logo.png')] bg-center bg-no-repeat bg-contain scale-150" />
                            </div>
                            <div className="px-6 pb-8 text-center -mt-12 relative z-10">
                                <div className="inline-block relative">
                                    <div className="absolute -inset-1 rounded-full bg-white dark:bg-slate-900 shadow-sm" />
                                    <img
                                        src={imageBase64 || (user && user.image) || "profile-image.webp"}
                                        alt="Profile"
                                        className="relative w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-md"
                                    />
                                </div>
                                <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white leading-tight">
                                    {user.name} {user.surname}
                                </h2>
                                <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mt-1">
                                    {user.scientific_name || "Researcher"}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
                                    {user.email}
                                </p>

                                {/* Social Links */}
                                <div className="flex justify-center gap-3 mt-6">
                                    {[
                                        { href: user?.google_scholar_url, src: "/linkedin-logo.webp" },
                                        { href: user?.google_scholar_url, src: "/google-scholar-logo.webp" },
                                        { href: user?.scopus_url, src: "/scopus-logo.webp" },
                                        { href: user?.webofscience_url, src: "/web-of-science-logo.webp" }
                                    ].map((link, i) => (
                                        link.href && (
                                            <a
                                                key={i}
                                                href={link.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-8 h-8 rounded-full border border-gray-100 dark:border-slate-800 flex items-center justify-center hover:scale-110 hover:border-blue-400 transition-all bg-gray-50 dark:bg-slate-800"
                                            >
                                                <img src={link.src} alt="social" className="w-5 h-5 object-contain rounded-full" />
                                            </a>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm p-3">
                            <ul className="space-y-1">
                                {navLinks.map((link) => {
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <li key={link.path}>
                                            <Link
                                                to={link.path}
                                                state={{ user }}
                                                className={`flex items-center px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                </aside>

                {/* ── Main Content Area ──────────────────────────────── */}
                <main className="flex-1 min-w-0">
                    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-gray-200 dark:border-slate-800 shadow-sm min-h-full flex flex-col overflow-hidden transition-all duration-300">
                        {/* Content Header */}
                        <div className="px-8 py-10 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 border-b border-gray-100 dark:border-slate-800 relative">
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                                {heading}
                            </h1>
                            <div className="w-12 h-1 bg-blue-600 rounded-full" />
                            
                            {/* Subtle Background Pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                                <img src="/aztu-logo.png" alt="" className="w-full h-full object-contain rotate-12" />
                            </div>
                        </div>

                        {/* Main Body */}
                        <div className="p-8 flex-1">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}