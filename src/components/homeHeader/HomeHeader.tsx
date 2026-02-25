import { Link, useLocation } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Researchers", to: "/researchers" },
];

/* ─── Sun / Moon icons ───────────────────────────────────────────── */
function SunIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                d="M10 1.75a.75.75 0 0 1 .75.75v1.25a.75.75 0 0 1-1.5 0V2.5A.75.75 0 0 1 10 1.75Zm0 5A3.25 3.25 0 1 0 10 13.25 3.25 3.25 0 0 0 10 6.75Zm-5.5 3.25a.75.75 0 0 0 0 1.5H6a.75.75 0 0 0 0-1.5H4.5Zm10 0a.75.75 0 0 0 0 1.5H16a.75.75 0 0 0 0-1.5h-1.5ZM10 15.75a.75.75 0 0 1 .75.75V17.5a.75.75 0 0 1-1.5 0v-1.25a.75.75 0 0 1 .75-.75ZM5.166 5.166a.75.75 0 0 1 1.06 0l.884.884a.75.75 0 0 1-1.06 1.06l-.884-.884a.75.75 0 0 1 0-1.06Zm8.608 8.608a.75.75 0 0 1 1.06 0l.884.884a.75.75 0 0 1-1.06 1.06l-.884-.884a.75.75 0 0 1 0-1.06Zm1.06-8.608a.75.75 0 0 1 0 1.06l-.884.884a.75.75 0 1 1-1.06-1.06l.884-.884a.75.75 0 0 1 1.06 0ZM6.11 13.774a.75.75 0 0 1 0 1.06l-.884.884a.75.75 0 0 1-1.06-1.06l.884-.884a.75.75 0 0 1 1.06 0Z"
                fill="currentColor" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.455 11.97a8 8 0 0 1-9.426-9.425 7.501 7.501 0 1 0 9.426 9.425Z"
                fill="currentColor" />
        </svg>
    );
}

export default function HomeHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <motion.div
                initial={{ y: -64, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/92 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-gray-200/80 dark:border-white/8 transition-colors duration-300"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
                            <motion.img
                                src="/aztu-logo.png"
                                alt="AzTU"
                                className="w-7 h-9 object-contain"
                                whileHover={{ scale: 1.08 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            />
                            <div className="hidden sm:block">
                                <p className="text-gray-400 dark:text-white/35 text-[9px] tracking-[0.2em] uppercase leading-none mb-0.5 transition-colors duration-300">
                                    Azerbaijan Technical University
                                </p>
                                <p className="font-semibold text-sm leading-none bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-300 dark:to-blue-300 bg-clip-text text-transparent transition-all duration-300">
                                    Research Portal
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.to;
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? "text-cyan-600 dark:text-cyan-300"
                                                : "text-gray-500 dark:text-white/55 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/8"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="home-nav-pill"
                                                className="absolute inset-0 rounded-xl bg-cyan-50 border border-cyan-200 dark:bg-cyan-500/12 dark:border-cyan-500/20"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5">
                            {/* Theme toggle */}
                            <motion.button
                                onClick={toggleTheme}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Toggle theme"
                                className="p-2 rounded-xl text-gray-500 dark:text-white/55 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/10 transition-all duration-200"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={theme}
                                        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>

                            {/* Sign In */}
                            <Link to="/signin" className="hidden sm:block">
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="relative px-4 py-1.5 rounded-xl text-sm font-semibold text-white overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl" />
                                    <span className="relative">Sign In</span>
                                </motion.button>
                            </Link>

                            {/* Mobile hamburger */}
                            <motion.button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="md:hidden p-2 rounded-xl text-gray-500 dark:text-white/55 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/10 transition-all duration-200"
                                whileTap={{ scale: 0.9 }}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={mobileOpen ? "close" : "menu"}
                                        initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        {mobileOpen ? <CloseIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden border-t border-gray-200/80 dark:border-white/8 md:hidden bg-white/98 dark:bg-transparent"
                        >
                            <nav className="px-4 py-3 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setMobileOpen(false)}
                                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            location.pathname === link.to
                                                ? "bg-cyan-50 text-cyan-600 border border-cyan-200 dark:bg-cyan-500/12 dark:text-cyan-300 dark:border-cyan-500/20"
                                                : "text-gray-600 dark:text-white/55 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/8"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link to="/signin" onClick={() => setMobileOpen(false)}>
                                    <button className="w-full mt-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold">
                                        Sign In
                                    </button>
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </header>
    );
}
