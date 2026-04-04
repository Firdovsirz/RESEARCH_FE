import { Link, useLocation } from "react-router";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

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

interface PublicHeaderProps {
    onSearch?: (value: string) => void;
    toggleMenu?: () => void;
    initialSearch?: string;
}

export default function PublicHeader({ onSearch, toggleMenu, initialSearch = "" }: PublicHeaderProps) {
    const [searchOpen, setSearchOpen] = useState(!!initialSearch);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) onSearch(value);
    };

    const handleCloseSearch = () => {
        setSearchOpen(false);
        setSearchTerm("");
        if (onSearch) onSearch("");
    };

    return (
        <header className="w-full flex justify-center items-center pt-6 pb-2 px-4">
            <motion.div
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full sm:w-[72%] max-w-3xl"
            >
                {/* Outer glow ring */}
                <div className="relative">
                    {/* Subtle glow beneath card */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-indigo-500/20 blur-sm pointer-events-none" />

                    <div className="relative px-5 py-3 bg-white/92 dark:bg-white/8 backdrop-blur-2xl border border-gray-200/80 dark:border-white/15 rounded-2xl flex flex-col gap-0 transition-colors duration-300">
                        {/* Top row */}
                        <div className="flex justify-between items-center h-12 gap-4">
                            {/* Logo + title */}
                            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
                                <motion.img
                                    src="/aztu-logo.png"
                                    alt="AzTU"
                                    className="w-9 h-11 object-contain drop-shadow-[0_0_8px_rgba(99,179,237,0.5)]"
                                    whileHover={{ scale: 1.08, rotate: -3 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                />
                                <div className="hidden sm:block">
                                    <p className="text-gray-400 dark:text-white/40 text-[10px] tracking-[0.18em] uppercase leading-none mb-0.5 transition-colors duration-300">
                                        Azerbaijan Technical University
                                    </p>
                                </div>
                            </Link>

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

                                {/* Search toggle */}
                                <motion.button
                                    onClick={() => searchOpen ? handleCloseSearch() : setSearchOpen(true)}
                                    className="p-2 rounded-xl text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/10 transition-all duration-200"
                                    whileTap={{ scale: 0.88 }}
                                    aria-label="Toggle search"
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.div
                                            key={searchOpen ? "close" : "search"}
                                            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {searchOpen
                                                ? <CloseIcon fontSize="medium" />
                                                : <SearchIcon fontSize="medium" />
                                            }
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.button>

                                {/* Login / Menu */}
                                {location.pathname !== "/researchers" ? (
                                    <motion.button
                                        onClick={toggleMenu}
                                        className="p-2 rounded-xl text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-white/10 transition-all duration-200 block sm:hidden"
                                        whileTap={{ scale: 0.88 }}
                                        aria-label="Toggle menu"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </motion.button>
                                ) : (
                                    <Link to="/signin">
                                        <motion.button
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="relative px-4 py-1.5 rounded-xl text-sm font-semibold text-white overflow-hidden"
                                        >
                                            {/* Button gradient bg */}
                                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl" />
                                            {/* Glow */}
                                            <span className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-400 to-blue-500 blur-sm" />
                                            <span className="relative">Login</span>
                                        </motion.button>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Search bar */}
                        <AnimatePresence>
                            {searchOpen && (
                                <motion.div
                                    key="search-bar"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.28, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-2 pb-1 relative">
                                        <SearchIcon
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 pointer-events-none"
                                            sx={{ fontSize: 16, marginTop: "4px" }}
                                        />
                                        <motion.input
                                            type="text"
                                            autoFocus
                                            placeholder="Search researchers by name, field..."
                                            value={searchTerm}
                                            onChange={handleInputChange}
                                            initial={{ scale: 0.98 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                            className="
                                                w-full pl-9 pr-4 py-2
                                                bg-gray-50 dark:bg-white/8 border border-gray-200 dark:border-white/12
                                                rounded-xl text-gray-900 dark:text-white text-sm
                                                placeholder-gray-400 dark:placeholder-white/30
                                                focus:outline-none focus:border-cyan-400/50
                                                focus:bg-white dark:focus:bg-white/12
                                                transition-all duration-300
                                            "
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </header>
    );
}
