import { Link } from "react-router";
import { useEffect, useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PublicHeader from '../publicHeader/PublicHeader';
import { motion } from "framer-motion";
import { getAllUsers, UserProfile } from "../../services/user/userService";

/* ─── Animation variants ─────────────────────────────────────────── */
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 36, scale: 0.97 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
};

/* ─── Skeleton card ──────────────────────────────────────────────── */
function SkeletonCard() {
    return (
        <div className="relative bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col gap-4 overflow-hidden">
            {/* shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />
            <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-white/15" />
                <div className="h-4 w-36 rounded-full bg-white/15" />
                <div className="h-3 w-24 rounded-full bg-white/10" />
            </div>
            <div className="bg-white/5 border border-white/8 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1.5">
                        <div className="h-3 w-20 rounded-full bg-white/10" />
                        <div className="h-3 w-16 rounded-full bg-white/10" />
                    </div>
                    <div className="flex gap-2">
                        {[0, 1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-white/10" />
                        ))}
                    </div>
                </div>
                <div className="h-3 w-44 rounded-full bg-white/10" />
            </div>
        </div>
    );
}

/* ─── Social link button ─────────────────────────────────────────── */
function SocialBtn({ href, src, alt }: { href?: string; src: string; alt: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.18, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="block rounded-full ring-1 ring-white/10 hover:ring-cyan-400/40 transition-all duration-200"
        >
            <img src={src} alt={alt} className="w-8 h-8 rounded-full object-cover" />
        </motion.a>
    );
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function Researchers() {
    const [start] = useState(0);
    const [end] = useState(10);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [userLength, setUserLength] = useState<number>();
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        getAllUsers(start, end, search)
            .then((res) => {
                if (typeof res === "object") {
                    setUsers(res.users);
                    setUserLength(res.total);
                } else {
                    setUsers([]);
                    setUserLength(0);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setLoading(true);
        const handler = setTimeout(() => {
            getAllUsers(start, end, search)
                .then((res) => {
                    if (typeof res === "object") {
                        setUsers(res.users);
                        setUserLength(res.total);
                    } else {
                        setUsers([]);
                        setUserLength(0);
                    }
                })
                .finally(() => setLoading(false));
        }, 400);
        return () => clearTimeout(handler);
    }, [search]);

    return (
        <div className="relative min-h-screen w-full">

            {/* ── Background ─────────────────────────────────────────── */}
            <div className="fixed inset-0 z-0">
                {/* Photo */}
                <div className="absolute inset-0 bg-[url('/aztu.webp')] bg-cover bg-center bg-no-repeat" />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-blue-950/75 to-indigo-950/85" />
                {/* Subtle grid lines */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(147,197,253,0.6) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(147,197,253,0.6) 1px, transparent 1px)
                        `,
                        backgroundSize: "64px 64px"
                    }}
                />
                {/* Radial glow top-left */}
                <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
                {/* Radial glow bottom-right */}
                <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
            </div>

            {/* ── Content ────────────────────────────────────────────── */}
            <div className="relative z-10 min-h-screen flex flex-col">

                <PublicHeader onSearch={setSearch} />

                {/* Result count */}
                {!loading && userLength !== undefined && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-10 mt-2 mb-4 flex items-center gap-2"
                    >
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <p className="text-white/40 text-xs tracking-[0.15em] uppercase">
                            {userLength} researcher{userLength !== 1 ? "s" : ""} found
                        </p>
                    </motion.div>
                )}

                {/* ── Card grid ──────────────────────────────────────── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="
                        flex flex-wrap gap-4 sm:gap-5
                        px-4 sm:px-8 md:px-10 pb-12
                        justify-center md:justify-start items-stretch
                        w-full max-w-[1400px] mx-auto
                    "
                >
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.1rem)]"
                            >
                                <SkeletonCard />
                            </div>
                        ))
                        : users.map((user, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                                className="
                                    relative group
                                    w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.1rem)]
                                    bg-white/8 backdrop-blur-xl
                                    border border-white/12
                                    rounded-2xl p-5 flex flex-col
                                    hover:border-cyan-400/35
                                    hover:shadow-[0_8px_40px_rgba(6,182,212,0.12)]
                                    transition-all duration-300
                                "
                            >
                                {/* Top edge glow on hover */}
                                <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-full" />

                                {/* ── Profile ── */}
                                <div className="flex flex-col items-center mb-4 relative">
                                    {/* Avatar with animated ring */}
                                    <div className="relative mb-3">
                                        <motion.div
                                            className="absolute -inset-1.5 rounded-full border border-cyan-400/25"
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                opacity: [0.4, 0.1, 0.4]
                                            }}
                                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                        <motion.div
                                            className="absolute -inset-3 rounded-full border border-cyan-400/12"
                                            animate={{
                                                scale: [1, 1.08, 1],
                                                opacity: [0.25, 0.05, 0.25]
                                            }}
                                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                                        />
                                        <img
                                            src={user.image ? user.image : "profile-image.webp"}
                                            alt={`${user.name} ${user.surname}`}
                                            className="w-20 h-20 rounded-full border border-white/20 object-cover relative z-10"
                                        />
                                    </div>

                                    <h2 className="text-white font-semibold text-base sm:text-lg text-center leading-tight">
                                        {user.name} {user.surname}
                                    </h2>
                                    <p className="text-white/45 text-xs sm:text-sm text-center mt-1 leading-snug">
                                        {[user.scientific_name, user.scientific_degree_name].filter(Boolean).join(" · ")}
                                    </p>

                                    {/* View profile button */}
                                    <Link to="/researcher-details" state={{ user }} className="absolute top-0 right-0">
                                        <motion.div
                                            whileHover={{ scale: 1.06 }}
                                            whileTap={{ scale: 0.94 }}
                                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-cyan-300/80 border border-cyan-400/25 hover:text-cyan-200 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all duration-200"
                                        >
                                            View
                                        </motion.div>
                                    </Link>
                                </div>

                                {/* ── Info card ── */}
                                <div className="mt-auto bg-white/5 border border-white/8 rounded-xl p-4 flex flex-col gap-3">
                                    {/* Birth date + social links */}
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <div className="flex items-center gap-1.5 text-white/35 mb-0.5">
                                                <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                <span className="text-[11px] tracking-wide">Doğum tarixi</span>
                                            </div>
                                            <span className="text-white/75 text-sm">
                                                {user.birth_date
                                                    ? new Date(user.birth_date).toLocaleDateString("en-GB")
                                                    : <span className="text-white/25">—</span>
                                                }
                                            </span>
                                        </div>
                                        <div className="flex gap-1.5 flex-shrink-0">
                                            <SocialBtn href={user?.google_scholar_url} src="/linkedin-logo.webp" alt="linkedin" />
                                            <SocialBtn href={user?.google_scholar_url} src="/google-scholar-logo.webp" alt="scholar" />
                                            <SocialBtn href={user?.scopus_url} src="/scopus-logo.webp" alt="scopus" />
                                            <SocialBtn href={user?.webofscience_url} src="/web-of-science-logo.webp" alt="wos" />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <div className="flex items-center gap-1.5 text-white/35 mb-0.5">
                                            <EmailIcon sx={{ fontSize: 13 }} />
                                            <span className="text-[11px] tracking-wide">E-poçt</span>
                                        </div>
                                        <a
                                            href={`mailto:${user?.email}`}
                                            className="text-cyan-300/70 text-sm hover:text-cyan-200 transition-colors duration-200 break-all"
                                        >
                                            {user?.email}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    }
                </motion.div>
            </div>
        </div>
    );
}
