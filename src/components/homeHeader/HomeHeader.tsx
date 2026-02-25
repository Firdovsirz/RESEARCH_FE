import { Link, useLocation } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Researchers", to: "/researchers" },
];

export default function HomeHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <motion.div
                initial={{ y: -64, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="bg-slate-950/75 backdrop-blur-2xl border-b border-white/8"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
                            <motion.img
                                src="/aztu-logo.png"
                                alt="AzTU"
                                className="w-7 h-9 object-contain drop-shadow-[0_0_6px_rgba(99,179,237,0.4)]"
                                whileHover={{ scale: 1.08 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            />
                            <div className="hidden sm:block">
                                <p className="text-white/35 text-[9px] tracking-[0.2em] uppercase leading-none mb-0.5">
                                    Azerbaijan Technical University
                                </p>
                                <p className="font-semibold text-sm leading-none bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
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
                                                ? "text-cyan-300"
                                                : "text-white/55 hover:text-white hover:bg-white/8"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="home-nav-pill"
                                                className="absolute inset-0 rounded-xl bg-cyan-500/12 border border-cyan-500/20"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
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
                                className="md:hidden p-2 rounded-xl text-white/55 hover:text-white hover:bg-white/10 transition-all duration-200"
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
                            className="overflow-hidden border-t border-white/8 md:hidden"
                        >
                            <nav className="px-4 py-3 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setMobileOpen(false)}
                                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            location.pathname === link.to
                                                ? "bg-cyan-500/12 text-cyan-300 border border-cyan-500/20"
                                                : "text-white/55 hover:text-white hover:bg-white/8"
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
