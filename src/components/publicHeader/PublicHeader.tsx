import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "../ui/button/Button";
import SearchIcon from '@mui/icons-material/Search';
import { motion, AnimatePresence } from "framer-motion";

interface PublicHeaderProps {
    onSearch?: (value: string) => void;
    toggleMenu?: () => void;
}

export default function PublicHeader({ onSearch, toggleMenu }: PublicHeaderProps) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) onSearch(value);
    };

    return (
        <header
            className={`w-full flex justify-center items-center transition-all duration-500 ease-in-out ${searchOpen ? "h-[140px]" : "h-[100px]"
                }`}
        >
            <div
                className="px-4 sm:px-[40px] py-2 sm:py-[10px] w-full sm:w-[60%] flex flex-col justify-center items-center bg-blue-100/50 backdrop-blur-md rounded-[40px] transition-all duration-500 ease-in-out"
            >
                <div className="w-full flex justify-between items-center h-[50px] gap-2 sm:gap-4">
                    <Link to={"/"} className="flex-shrink-0">
                        <img
                            src="/aztu-logo.png"
                            alt="Azerbaijan Technical University"
                            className="w-[40px] h-[50px]"
                        />
                    </Link>
                    {/* <h1 className="text-lg sm:text-xl font-semibold transition-all duration-500 ease-in-out flex-grow text-center">
                        <Link to={"/"}>
                            AzTU Researchers
                        </Link>
                    </h1> */}
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-2 rounded-full hover:bg-blue-200 transition-colors duration-300 ease-in-out"
                            aria-label="Toggle search"
                        >
                            <SearchIcon className="transition-transform duration-300 ease-in-out" fontSize="medium" />
                        </button>
                        {location.pathname !== "/" ? (
                            <button
                                onClick={toggleMenu}
                                className="p-2 rounded-full hover:bg-blue-200 transition-colors duration-300 ease-in-out block sm:hidden"
                                aria-label="Toggle menu"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        ) : (
                            <div className="block">
                                <Button>
                                    <Link to={"/signin"}>Login</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            key="search"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 40, opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full mt-2 overflow-hidden border-b border-gray-400"
                        >
                            <input
                                type="text"
                                placeholder="Enter your search..."
                                value={searchTerm}
                                onChange={handleInputChange}
                                className="w-full px-0 py-2 border-b border-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-500 ease-in-out box-border"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}