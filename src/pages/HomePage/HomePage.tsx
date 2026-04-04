import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import { getAllUsers } from "../../services/user/userService";
import SearchIcon from "@mui/icons-material/Search";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ScienceIcon from "@mui/icons-material/Science";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

/* ─── Static mock data ─────────────────────────────────────────── */
const researchAreas = [
    { title: "Engineering & Technology", icon: "⚙️", count: 12 },
    { title: "Computer Science & IT", icon: "💻", count: 9 },
    { title: "Energy & Environment", icon: "🌿", count: 7 },
    { title: "Architecture & Construction", icon: "🏗️", count: 5 },
    { title: "Management & Economics", icon: "📊", count: 6 },
    { title: "Natural Sciences", icon: "🔬", count: 8 },
];

const latestUpdates = [
    { type: "Article", title: "Advanced Neural Networks in Structural Engineering", author: "Dr. Aliyev A.", date: "Today" },
    { type: "Project", title: "Sustainable Urban Development in Baku", author: "Prof. Hasanov M.", date: "Yesterday" },
    { type: "Publication", title: "Renewable Energy Sources in Azerbaijan", author: "Dr. Guliyeva S.", date: "2 days ago" },
    { type: "Certificate", title: "International Research Excellence Award", author: "Prof. Ibrahimov R.", date: "3 days ago" },
];

/* ─── Main component ──────────────────────────────────────────────── */
export default function HomePage() {
    const navigate = useNavigate();
    const [researcherCount, setResearcherCount] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getAllUsers(0, 1, "").then((res) => {
            if (typeof res === "object") setResearcherCount(res.total);
        });
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/researchers?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    const statsData = [
        { Icon: GroupsIcon, value: researcherCount !== null ? String(researcherCount) : "—", label: "Researchers", color: "text-blue-600" },
        { Icon: MenuBookIcon, value: "1420+", label: "Publications", color: "text-emerald-600" },
        { Icon: AssignmentIcon, value: "85+", label: "Projects", color: "text-amber-600" },
        { Icon: TrendingUpIcon, value: "3200+", label: "Citations", color: "text-purple-600" },
    ];

    return (
        <>
            <PageMeta
                title="Academic Data Management System"
                description="Azerbaijan Technical University Academic Data Management System Discover researchers, publications and academic excellence."
            />

            <div className="relative min-h-screen bg-[#f8f9fa] dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300">
                <HomeHeader />

                {/* ── Hero / Search Section ─────────────────────────── */}
                <section className="relative z-10 pt-32 pb-20 px-4 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center mb-10"
                        >
                            <img src="/aztu-logo.png" alt="AzTU" className="w-16 h-20 mb-6 object-contain" />
                            <h2 className="text-gray-500 dark:text-gray-400 text-sm tracking-[0.2em] uppercase mb-2">Azerbaijan Technical University</h2>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                Academic Data Management System
                            </h1>
                            <div className="w-20 h-1 bg-blue-600 mx-auto mt-6 rounded-full" />
                        </motion.div>

                        {/* Search Bar */}
                        <div className="max-w-3xl mx-auto mb-12">
                            <form onSubmit={handleSearch} className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <SearchIcon className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search researchers by name, department, or research interest..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-14 pr-32 py-5 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-all text-lg"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 top-2 bottom-2 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
                                >
                                    Search
                                </button>
                            </form>
                            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>Trending:</span>
                                <Link to="/researchers?search=AI" className="hover:text-blue-600 underline underline-offset-4 decoration-blue-500/30">Artificial Intelligence</Link>
                                <Link to="/researchers?search=Renewable" className="hover:text-blue-600 underline underline-offset-4 decoration-blue-500/30">Renewable Energy</Link>
                                <Link to="/researchers?search=Structure" className="hover:text-blue-600 underline underline-offset-4 decoration-blue-500/30">Structural Engineering</Link>
                            </div>
                        </div>

                        {/* Stats Summary */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {statsData.map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-[#f8f9fa] dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 flex flex-col items-center"
                                >
                                    <s.Icon className={`${s.color} mb-3`} style={{ fontSize: 32 }} />
                                    <span className="text-3xl font-black text-gray-900 dark:text-white tabular-nums">{s.value}</span>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs tracking-widest uppercase mt-1">{s.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Main Content Grid ─────────────────────────────── */}
                <main className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left: Latest Updates & News (8 cols) */}
                    <div className="lg:col-span-8 space-y-10">
                        <section>
                            <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-slate-800 pb-4">
                                <h3 className="text-2xl font-bold flex items-center gap-3">
                                    <TrendingUpIcon className="text-blue-600" />
                                    Latest Academic Activities
                                </h3>
                                <Link to="/researchers" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View All</Link>
                            </div>
                            <div className="space-y-4">
                                {latestUpdates.map((update, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all flex gap-4"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                            {update.type === "Article" && <MenuBookIcon className="text-blue-600" />}
                                            {update.type === "Project" && <ScienceIcon className="text-blue-600" />}
                                            {update.type === "Publication" && <AssignmentIcon className="text-blue-600" />}
                                            {update.type === "Certificate" && <SchoolIcon className="text-blue-600" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 bg-blue-50 dark:bg-blue-900/50 px-2 py-0.5 rounded-md">
                                                    {update.type}
                                                </span>
                                                <span className="text-xs text-gray-400">{update.date}</span>
                                            </div>
                                            <h4 className="text-gray-900 dark:text-white font-bold mb-1 truncate">{update.title}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">By {update.author}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-slate-800 pb-4">
                                <h3 className="text-2xl font-bold flex items-center gap-3">
                                    <ScienceIcon className="text-blue-600" />
                                    Research Areas
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {researchAreas.map((area, i) => (
                                    <Link
                                        key={i}
                                        to={`/researchers?search=${encodeURIComponent(area.title)}`}
                                        className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all text-center"
                                    >
                                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{area.icon}</div>
                                        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{area.title}</h4>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{area.count} Researchers</p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Info & Stats (4 cols) */}
                    <div className="lg:col-span-4 space-y-10">
                        <section className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20">
                            <h3 className="text-xl font-bold mb-4">About Researchers</h3>
                            <p className="text-white/80 text-sm leading-relaxed mb-6">
                                Researchers Platform is a digital ecosystem designed to monitor, evaluate, and showcase the research potential of Azerbaijan Technical University.
                            </p>
                            <ul className="space-y-4 text-sm font-medium">
                                <li className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                                    Dynamic Researcher Profiles
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                                    Institutional Repository
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                                    Performance Tracking
                                </li>
                            </ul>
                            <Link to="/signup">
                                <button className="w-full mt-8 py-4 bg-white text-blue-900 font-bold rounded-2xl hover:bg-gray-100 transition-colors">
                                    Register as Researcher
                                </button>
                            </Link>
                        </section>

                        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <TrendingUpIcon className="text-blue-600" />
                                Top Indicators
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                                        <span className="text-gray-500">Engineering</span>
                                        <span className="text-blue-600">42%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "42%" }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                                        <span className="text-gray-500">Natural Sciences</span>
                                        <span className="text-emerald-600">28%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: "28%" }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                                        <span className="text-gray-500">Computer Science</span>
                                        <span className="text-amber-600">18%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-600 rounded-full" style={{ width: "18%" }} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                {/* ── Footer ────────────────────────────────────────── */}
                <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pt-16 pb-8 px-4 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                            <div className="md:col-span-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <img src="/aztu-logo.png" alt="AzTU" className="w-10 h-12 object-contain" />
                                    <div>
                                        <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase leading-none mb-1">Azerbaijan</p>
                                        <p className="font-bold text-gray-900 dark:text-white leading-none">Technical University</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Researchers Platform is a comprehensive platform for managing academic performance and showcasing scientific achievements.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">Quick Search</h4>
                                <ul className="space-y-3 text-sm font-medium">
                                    <li><Link to="/researchers" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Search Researcher</Link></li>
                                    <li><Link to="/researchers" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Institutional Repository</Link></li>
                                    <li><Link to="/researchers" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Project Search</Link></li>
                                    <li><Link to="/researchers" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Publication Statistics</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">Useful Links</h4>
                                <ul className="space-y-3 text-sm font-medium">
                                    <li><a href="https://aztu.edu.az" target="_blank" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">University Website</a></li>
                                    <li><Link to="/signin" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Library System</Link></li>
                                    <li><Link to="/signin" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Academic Calendar</Link></li>
                                    <li><Link to="/signin" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-gray-400">Contact</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    H. Cavid Ave. 25<br />
                                    Baku, Azerbaijan AZ1073<br /><br />
                                    Email: info@aztu.edu.az<br />
                                    Phone: +994 12 538 32 35
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                            <p>© {new Date().getFullYear()} Azerbaijan Technical University. All rights reserved.</p>
                            <p>Powered by AzTU IT Department</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
