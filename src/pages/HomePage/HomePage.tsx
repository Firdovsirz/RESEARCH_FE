import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import { getAllUsers } from "../../services/user/userService";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ScienceIcon from "@mui/icons-material/Science";
import SchoolIcon from "@mui/icons-material/School";

/* ─── Animation helper ────────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
    }),
};

/* ─── Static data ────────────────────────────────────────────────── */
const researchAreas = [
    { title: "Engineering & Technology", icon: "⚙️", count: 12 },
    { title: "Computer Science & IT", icon: "💻", count: 9 },
    { title: "Energy & Environment", icon: "🌿", count: 7 },
    { title: "Architecture & Construction", icon: "🏗️", count: 5 },
    { title: "Management & Economics", icon: "📊", count: 6 },
    { title: "Natural Sciences", icon: "🔬", count: 8 },
];

/* ─── Main component ──────────────────────────────────────────────── */
export default function HomePage() {
    const [researcherCount, setResearcherCount] = useState<number | null>(null);

    useEffect(() => {
        getAllUsers(0, 1, "").then((res) => {
            if (typeof res === "object") setResearcherCount(res.total);
        });
    }, []);

    const statsData = [
        { Icon: GroupsIcon, value: researcherCount !== null ? String(researcherCount) : "—", label: "Researchers", color: "from-cyan-400 to-blue-500" },
        { Icon: MenuBookIcon, value: "12+", label: "Faculties", color: "from-blue-400 to-indigo-500" },
        { Icon: ScienceIcon, value: "50+", label: "Research Areas", color: "from-indigo-400 to-purple-500" },
        { Icon: SchoolIcon, value: "74+", label: "Years of Excellence", color: "from-violet-400 to-fuchsia-500" },
    ];

    return (
        <>
            <PageMeta
                title="AzTU Research Portal – Azerbaijan Technical University"
                description="Discover researchers, publications and academic excellence at Azerbaijan Technical University."
            />

            {/* ── Page shell ───────────────────────────────────────── */}
            <div className="relative min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300">

                {/* ── Dark-mode only fixed ambient background ───── */}
                <div className="fixed inset-0 z-0 pointer-events-none hidden dark:block">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/25 to-slate-950" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(147,197,253,0.8) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(147,197,253,0.8) 1px, transparent 1px)
                            `,
                            backgroundSize: "80px 80px",
                        }}
                    />
                    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl" />
                    <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl" />
                </div>

                {/* ── Light-mode only fixed background ───────────── */}
                <div className="fixed inset-0 z-0 pointer-events-none dark:hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
                </div>

                {/* ── Header ───────────────────────────────────────── */}
                <HomeHeader />

                {/* ═══════════════════════════════════════════════════
                    HERO — navy blue in both modes (institutional)
                ═══════════════════════════════════════════════════ */}
                <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 dark:from-slate-950 dark:via-blue-950/50 dark:to-indigo-950">

                    {/* Decorative overlays */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-[0.05]"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                                backgroundSize: "64px 64px",
                            }}
                        />
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-400/8 blur-3xl" />
                        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-blue-900/50 dark:from-slate-950/80 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-[11px] tracking-[0.18em] uppercase mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                            Academic Research Portal
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            custom={0.1}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6 text-white"
                        >
                            Azerbaijan
                            <br />
                            <span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                                Technical University
                            </span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            custom={0.22}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                        >
                            Explore the scientific profiles, research achievements and publications of
                            AzTU faculty members across all faculties and disciplines.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            custom={0.36}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col sm:flex-row gap-3 justify-center"
                        >
                            <Link to="/researchers">
                                <motion.button
                                    whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(6,182,212,0.35)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold text-base shadow-lg shadow-cyan-500/25 flex items-center gap-2"
                                >
                                    Browse Researchers
                                    <ArrowForwardIcon fontSize="small" />
                                </motion.button>
                            </Link>
                            <Link to="/signin">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-7 py-3 rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm text-white font-semibold text-base hover:bg-white/18 hover:border-white/40 transition-all duration-200"
                                >
                                    Sign In to Portal
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Scroll cue */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                            className="mt-24 flex flex-col items-center gap-2 text-white/25"
                        >
                            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to explore</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                                className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    STATS
                ═══════════════════════════════════════════════════ */}
                <section className="relative z-10 py-16 px-4 bg-white dark:bg-transparent transition-colors duration-300">
                    <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {statsData.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group bg-white border border-gray-100 shadow-sm rounded-2xl p-6 text-center hover:shadow-md hover:border-gray-200 dark:bg-white/4 dark:border-white/8 dark:shadow-none dark:hover:bg-white/7 dark:hover:border-white/14 transition-all duration-300"
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${s.color} mb-4 opacity-90 group-hover:opacity-100 transition-opacity`}>
                                    <s.Icon className="text-white" style={{ fontSize: 20 }} />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1 tabular-nums transition-colors duration-300">{s.value}</p>
                                <p className="text-gray-400 dark:text-white/38 text-xs tracking-wide uppercase transition-colors duration-300">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    RESEARCH AREAS
                ═══════════════════════════════════════════════════ */}
                <section id="research-areas" className="relative z-10 py-20 px-4 bg-gray-50 dark:bg-transparent transition-colors duration-300">
                    <div className="max-w-6xl mx-auto">
                        {/* Section heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55 }}
                            className="text-center mb-12"
                        >
                            <p className="text-cyan-600 dark:text-cyan-400 text-xs tracking-[0.22em] uppercase mb-3 transition-colors duration-300">Explore by Field</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Research Areas</h2>
                            <p className="text-gray-500 dark:text-white/38 max-w-xl mx-auto leading-relaxed transition-colors duration-300">
                                Discover cutting-edge research across AzTU's diverse academic disciplines and faculties
                            </p>
                        </motion.div>

                        {/* Area cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {researchAreas.map((area, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07, duration: 0.4 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="group relative bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 cursor-pointer shadow-sm hover:shadow-md hover:border-cyan-300 dark:bg-white/4 dark:border-white/8 dark:shadow-none dark:hover:bg-white/7 dark:hover:border-cyan-400/22 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="text-3xl mb-3">{area.icon}</div>
                                    <h3 className="text-gray-800 dark:text-white font-semibold text-sm sm:text-base mb-1.5 leading-snug transition-colors duration-300">
                                        {area.title}
                                    </h3>
                                    <p className="text-gray-400 dark:text-white/32 text-xs transition-colors duration-300">{area.count} research groups</p>
                                    <div className="mt-3 h-px bg-gradient-to-r from-cyan-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mt-10"
                        >
                            <Link to="/researchers">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-cyan-300 text-cyan-600 dark:border-cyan-400/28 dark:text-cyan-300 text-sm font-medium hover:bg-cyan-50 dark:hover:bg-cyan-400/7 transition-all duration-200"
                                >
                                    View All Researchers
                                    <ArrowForwardIcon fontSize="small" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    ABOUT AzTU
                ═══════════════════════════════════════════════════ */}
                <section id="about" className="relative z-10 py-20 px-4 bg-white dark:bg-transparent transition-colors duration-300">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left text */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <p className="text-cyan-600 dark:text-cyan-400 text-xs tracking-[0.22em] uppercase mb-3 transition-colors duration-300">About AzTU</p>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
                                    Building the Future
                                    <br />
                                    <span className="text-gray-400 dark:text-white/50 transition-colors duration-300">Through Research</span>
                                </h2>
                                <p className="text-gray-500 dark:text-white/45 leading-relaxed mb-5 transition-colors duration-300">
                                    Azerbaijan Technical University (AzTU) is the leading technical higher education institution
                                    in Azerbaijan, training engineers and technical specialists since 1950. Our researchers drive
                                    innovation across engineering, technology, and applied sciences.
                                </p>
                                <p className="text-gray-500 dark:text-white/45 leading-relaxed mb-8 transition-colors duration-300">
                                    The AzTU Research Portal connects the academic community, showcasing the work of our faculty
                                    members, enabling international collaboration, and making Azerbaijani research accessible to
                                    the world.
                                </p>
                                <Link to="/researchers">
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/15"
                                    >
                                        Meet Our Researchers
                                        <ArrowForwardIcon fontSize="small" />
                                    </motion.button>
                                </Link>
                            </motion.div>

                            {/* Right decorative card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="relative"
                            >
                                {/* Card */}
                                <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900/80 dark:to-blue-950/60 aspect-[4/3] flex items-center justify-center shadow-md dark:shadow-none transition-all duration-300">
                                    <img
                                        src="/aztu-logo.png"
                                        alt="AzTU"
                                        className="w-32 h-auto object-contain opacity-8 dark:opacity-10"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-transparent to-indigo-600/5 dark:from-cyan-950/30 dark:via-transparent dark:to-indigo-950/40" />
                                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

                                    {/* Info bar */}
                                    <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-blue-100/90 dark:from-slate-950/80 to-transparent transition-colors duration-300">
                                        <div className="flex gap-6">
                                            <div>
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">1950</p>
                                                <p className="text-gray-400 dark:text-white/35 text-xs transition-colors duration-300">Year Founded</p>
                                            </div>
                                            <div className="w-px bg-gray-300 dark:bg-white/10 transition-colors duration-300" />
                                            <div>
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Baku</p>
                                                <p className="text-gray-400 dark:text-white/35 text-xs transition-colors duration-300">Azerbaijan</p>
                                            </div>
                                            <div className="w-px bg-gray-300 dark:bg-white/10 transition-colors duration-300" />
                                            <div>
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">AzTU</p>
                                                <p className="text-gray-400 dark:text-white/35 text-xs transition-colors duration-300">aztu.edu.az</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    CTA BANNER — always dark (brand prominence)
                ═══════════════════════════════════════════════════ */}
                <section className="relative z-10 py-20 px-4 bg-gray-50 dark:bg-transparent transition-colors duration-300">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-3xl overflow-hidden border border-transparent p-10 sm:p-16 text-center"
                        >
                            {/* Deep blue gradient bg — looks great in both modes */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950" />
                            <div
                                className="absolute inset-0 opacity-[0.05]"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                                    backgroundSize: "40px 40px",
                                }}
                            />
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
                            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-cyan-400/10 blur-3xl" />
                            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-indigo-400/10 blur-3xl" />

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/75 text-[10px] tracking-widest uppercase mb-6"
                                >
                                    <span className="w-1 h-1 rounded-full bg-cyan-300" />
                                    Join the Community
                                </motion.div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                    Are you an AzTU Researcher?
                                </h2>
                                <p className="text-white/55 mb-8 max-w-lg mx-auto leading-relaxed">
                                    Create your academic profile, share your research publications, and connect with the
                                    global scientific community.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Link to="/signup">
                                        <motion.button
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20"
                                        >
                                            Register as Researcher
                                        </motion.button>
                                    </Link>
                                    <Link to="/researchers">
                                        <motion.button
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-7 py-3 rounded-xl border border-white/25 bg-white/10 text-white font-semibold hover:bg-white/18 transition-all duration-200"
                                        >
                                            Browse Profiles
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    FOOTER
                ═══════════════════════════════════════════════════ */}
                <footer className="relative z-10 border-t border-gray-200 dark:border-white/8 py-14 px-4 bg-white dark:bg-transparent transition-colors duration-300">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
                            {/* Brand */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <img src="/aztu-logo.png" alt="AzTU" className="w-7 h-9 object-contain opacity-70" />
                                    <div>
                                        <p className="text-gray-400 dark:text-white/35 text-[9px] tracking-[0.2em] uppercase transition-colors duration-300">Azerbaijan</p>
                                        <p className="text-gray-800 dark:text-white font-semibold text-sm transition-colors duration-300">Technical University</p>
                                    </div>
                                </div>
                                <p className="text-gray-400 dark:text-white/30 text-sm leading-relaxed transition-colors duration-300">
                                    H. Cavid Ave. 25<br />
                                    Baku, Azerbaijan AZ1073
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <p className="text-gray-400 dark:text-white/45 text-[10px] tracking-[0.2em] uppercase mb-5 transition-colors duration-300">Quick Links</p>
                                <ul className="space-y-2.5">
                                    {[
                                        { label: "Home", to: "/" },
                                        { label: "Researchers", to: "/researchers" },
                                        { label: "Sign In", to: "/signin" },
                                        { label: "Register", to: "/signup" },
                                    ].map((l) => (
                                        <li key={l.to}>
                                            <Link
                                                to={l.to}
                                                className="text-gray-400 dark:text-white/35 text-sm hover:text-cyan-600 dark:hover:text-white/75 transition-colors duration-200 flex items-center gap-1.5 group"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-white/20 group-hover:bg-cyan-500 dark:group-hover:bg-cyan-400/60 transition-colors" />
                                                {l.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <p className="text-gray-400 dark:text-white/45 text-[10px] tracking-[0.2em] uppercase mb-5 transition-colors duration-300">Contact</p>
                                <ul className="space-y-2.5">
                                    {["info@aztu.edu.az", "+994 12 538 32 35", "aztu.edu.az"].map((c, i) => (
                                        <li key={i} className="text-gray-400 dark:text-white/35 text-sm transition-colors duration-300">{c}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="border-t border-gray-200 dark:border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 transition-colors duration-300">
                            <p className="text-gray-300 dark:text-white/22 text-xs transition-colors duration-300">
                                © {new Date().getFullYear()} Azerbaijan Technical University. All rights reserved.
                            </p>
                            <p className="text-gray-300 dark:text-white/18 text-xs transition-colors duration-300">AzTU Research Portal</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
