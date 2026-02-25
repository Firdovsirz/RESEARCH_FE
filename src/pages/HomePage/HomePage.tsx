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

/* ─── Animation helpers ───────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
    }),
};

/* ─── Research areas data ─────────────────────────────────────────── */
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

            <div className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">
                {/* ── Global decorative background ─────────────────── */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950" />
                    {/* Subtle grid */}
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
                    {/* Ambient glows */}
                    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl" />
                    <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full bg-indigo-500/6 blur-3xl" />
                    <div className="absolute bottom-1/4 -left-48 w-96 h-96 rounded-full bg-blue-500/6 blur-3xl" />
                </div>

                {/* ── Fixed Header ──────────────────────────────────── */}
                <HomeHeader />

                {/* ═══════════════════════════════════════════════════
                    HERO SECTION
                ═══════════════════════════════════════════════════ */}
                <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16">
                    {/* Hero background layer */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/aztu-logo.webp')] bg-center bg-no-repeat opacity-[0.03] scale-150" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950" />
                        {/* Radial accent */}
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/6 blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/22 text-cyan-300 text-[11px] tracking-[0.18em] uppercase mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            Academic Research Portal
                        </motion.div>

                        {/* Main headline */}
                        <motion.h1
                            custom={0.1}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
                        >
                            <span className="text-white">Azerbaijan</span>
                            <br />
                            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                                Technical University
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            custom={0.22}
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-white/45 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
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
                                    whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(6,182,212,0.3)" }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-base shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                                >
                                    Browse Researchers
                                    <ArrowForwardIcon fontSize="small" />
                                </motion.button>
                            </Link>
                            <Link to="/signin">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-7 py-3 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm text-white font-semibold text-base hover:bg-white/10 hover:border-white/25 transition-all duration-200"
                                >
                                    Sign In to Portal
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Scroll indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                            className="mt-24 flex flex-col items-center gap-2 text-white/18"
                        >
                            <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to explore</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                                className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    STATS SECTION
                ═══════════════════════════════════════════════════ */}
                <section className="relative z-10 py-16 px-4">
                    <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {statsData.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group bg-white/4 backdrop-blur border border-white/8 rounded-2xl p-6 text-center hover:bg-white/7 hover:border-white/14 transition-all duration-300"
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${s.color} mb-4 opacity-90 group-hover:opacity-100 transition-opacity`}>
                                    <s.Icon className="text-white" style={{ fontSize: 20 }} />
                                </div>
                                <p className="text-3xl font-bold text-white mb-1 tabular-nums">{s.value}</p>
                                <p className="text-white/38 text-xs tracking-wide uppercase">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    RESEARCH AREAS SECTION
                ═══════════════════════════════════════════════════ */}
                <section id="research-areas" className="relative z-10 py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Section header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55 }}
                            className="text-center mb-12"
                        >
                            <p className="text-cyan-400 text-xs tracking-[0.22em] uppercase mb-3">Explore by Field</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Research Areas</h2>
                            <p className="text-white/38 max-w-xl mx-auto leading-relaxed">
                                Discover cutting-edge research across AzTU's diverse academic disciplines and faculties
                            </p>
                        </motion.div>

                        {/* Area cards grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {researchAreas.map((area, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07, duration: 0.4 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="group relative bg-white/4 border border-white/8 rounded-2xl p-5 sm:p-6 cursor-pointer hover:bg-white/7 hover:border-cyan-400/22 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Hover top glow line */}
                                    <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="text-3xl mb-3">{area.icon}</div>
                                    <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5 leading-snug">
                                        {area.title}
                                    </h3>
                                    <p className="text-white/32 text-xs">{area.count} research groups</p>

                                    {/* Hover underline */}
                                    <div className="mt-3 h-px bg-gradient-to-r from-cyan-400/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
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
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-cyan-400/28 text-cyan-300 text-sm font-medium hover:bg-cyan-400/7 transition-all duration-200"
                                >
                                    View All Researchers
                                    <ArrowForwardIcon fontSize="small" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    ABOUT AZTU SECTION
                ═══════════════════════════════════════════════════ */}
                <section id="about" className="relative z-10 py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Left – text */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <p className="text-cyan-400 text-xs tracking-[0.22em] uppercase mb-3">About AzTU</p>
                                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                                    Building the Future
                                    <br />
                                    <span className="text-white/50">Through Research</span>
                                </h2>
                                <p className="text-white/45 leading-relaxed mb-5">
                                    Azerbaijan Technical University (AzTU) is the leading technical higher education institution
                                    in Azerbaijan, training engineers and technical specialists since 1950. Our researchers drive
                                    innovation across engineering, technology, and applied sciences.
                                </p>
                                <p className="text-white/45 leading-relaxed mb-8">
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

                            {/* Right – decorative card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="relative"
                            >
                                {/* Main card */}
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/80 to-blue-950/60 backdrop-blur aspect-[4/3] flex items-center justify-center">
                                    {/* AzTU logo watermark */}
                                    <img
                                        src="/aztu-logo.png"
                                        alt="AzTU"
                                        className="w-32 h-auto object-contain opacity-10"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-transparent to-indigo-950/40" />
                                    {/* Top glow line */}
                                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

                                    {/* Info overlay */}
                                    <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-950/80 to-transparent">
                                        <div className="flex gap-6">
                                            <div>
                                                <p className="text-2xl font-bold text-white">1950</p>
                                                <p className="text-white/35 text-xs">Year Founded</p>
                                            </div>
                                            <div className="w-px bg-white/10" />
                                            <div>
                                                <p className="text-2xl font-bold text-white">Baku</p>
                                                <p className="text-white/35 text-xs">Azerbaijan</p>
                                            </div>
                                            <div className="w-px bg-white/10" />
                                            <div>
                                                <p className="text-2xl font-bold text-white">AzTU</p>
                                                <p className="text-white/35 text-xs">aztu.edu.az</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    CTA BANNER SECTION
                ═══════════════════════════════════════════════════ */}
                <section className="relative z-10 py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative rounded-3xl overflow-hidden border border-white/10 p-10 sm:p-16 text-center"
                        >
                            {/* Background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/50 via-blue-950/50 to-indigo-950/60" />
                            {/* Grid pattern */}
                            <div
                                className="absolute inset-0 opacity-[0.04]"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(147,197,253,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.8) 1px, transparent 1px)`,
                                    backgroundSize: "40px 40px",
                                }}
                            />
                            {/* Top glow line */}
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent" />
                            {/* Corner glows */}
                            <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-cyan-500/10 blur-2xl" />
                            <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-indigo-500/10 blur-2xl" />

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/22 text-cyan-300 text-[10px] tracking-widest uppercase mb-6"
                                >
                                    <span className="w-1 h-1 rounded-full bg-cyan-400" />
                                    Join the Community
                                </motion.div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                    Are you an AzTU Researcher?
                                </h2>
                                <p className="text-white/45 mb-8 max-w-lg mx-auto leading-relaxed">
                                    Create your academic profile, share your research publications, and connect with the
                                    global scientific community.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Link to="/signup">
                                        <motion.button
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20"
                                        >
                                            Register as Researcher
                                        </motion.button>
                                    </Link>
                                    <Link to="/researchers">
                                        <motion.button
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-7 py-3 rounded-xl border border-white/15 bg-white/5 text-white font-semibold hover:bg-white/10 hover:border-white/25 transition-all duration-200"
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
                <footer className="relative z-10 border-t border-white/8 py-14 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
                            {/* Brand */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <img src="/aztu-logo.png" alt="AzTU" className="w-7 h-9 object-contain opacity-70" />
                                    <div>
                                        <p className="text-white/35 text-[9px] tracking-[0.2em] uppercase">Azerbaijan</p>
                                        <p className="text-white font-semibold text-sm">Technical University</p>
                                    </div>
                                </div>
                                <p className="text-white/30 text-sm leading-relaxed">
                                    H. Cavid Ave. 25<br />
                                    Baku, Azerbaijan AZ1073
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <p className="text-white/45 text-[10px] tracking-[0.2em] uppercase mb-5">Quick Links</p>
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
                                                className="text-white/35 text-sm hover:text-white/75 transition-colors duration-200 flex items-center gap-1.5 group"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-cyan-400/60 transition-colors" />
                                                {l.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <p className="text-white/45 text-[10px] tracking-[0.2em] uppercase mb-5">Contact</p>
                                <ul className="space-y-2.5">
                                    {[
                                        { label: "info@aztu.edu.az" },
                                        { label: "+994 12 538 32 35" },
                                        { label: "aztu.edu.az" },
                                    ].map((c, i) => (
                                        <li key={i} className="text-white/35 text-sm">{c.label}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                            <p className="text-white/22 text-xs">
                                © {new Date().getFullYear()} Azerbaijan Technical University. All rights reserved.
                            </p>
                            <p className="text-white/18 text-xs">AzTU Research Portal</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
