import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../ui/button/Button";
import SearchIcon from '@mui/icons-material/Search';
import { motion, AnimatePresence } from "framer-motion";

interface PublicHeaderProps {
    onSearch?: (value: string) => void;
}

export default function PublicHeader({ onSearch }: PublicHeaderProps) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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
                className="px-[40px] py-[10px] w-[60%] flex flex-col justify-center items-center bg-blue-100/50 backdrop-blur-md rounded-[40px] transition-all duration-500 ease-in-out"
            >
                <div className="w-full flex justify-between items-center h-[50px]">
                    <img
                        src="/aztu-logo.webp"
                        alt="Azerbaijan Technical University"
                        style={{ width: "100px", height: "50px" }}
                    />
                    <h1 className="transition-all duration-500 ease-in-out">AzTU Researchers</h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-2 rounded-full hover:bg-blue-200 transition-colors duration-300 ease-in-out"
                        >
                            <SearchIcon className="transition-transform duration-300 ease-in-out" />
                        </button>
                        <Button>
                            <Link to={"/signin"}>Login</Link>
                        </Button>
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