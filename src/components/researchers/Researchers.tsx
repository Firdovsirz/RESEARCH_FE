import { Link } from "react-router";
import { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import EmailIcon from '@mui/icons-material/Email';
import PublicHeader from '../publicHeader/PublicHeader';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getAllUsers, UserProfile } from "../../services/user/userService";

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
            {/* Sticky background image with blue overlay */}
            <div className="fixed inset-0 w-full h-full z-0">
                <div className="absolute inset-0 bg-[url('/aztu.webp')] bg-cover bg-center bg-no-repeat"></div>
                <div className="absolute inset-0 bg-blue-900/60"></div>
            </div>
            {/* Main content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header at the top, full width */}
                <div className="w-full">
                    <PublicHeader onSearch={setSearch} />
                </div>
                {/* Cards grid */}
                <div
                    className="
                        flex flex-wrap gap-4 sm:gap-6 px-2 sm:px-6 md:px-10 py-6 md:py-10
                        justify-center md:justify-start items-stretch
                        w-full max-w-[1400px] mx-auto
                        "
                >
                    {loading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="
                                    flex flex-col justify-between items-center
                                    bg-gray-100 shadow-md rounded-2xl
                                    hover:shadow-lg transition-shadow duration-300
                                    w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[32%]
                                    max-w-full p-4 sm:p-5 mb-4
                                "
                                style={{ borderRadius: 20 }}
                            >
                                <div className="flex justify-between items-start w-full mb-4">
                                    <div className="flex flex-col items-center">
                                        <Skeleton variant="circular" width={70} height={70} className="mb-2 max-w-full" />
                                        <Skeleton variant="text" width={100} height={20} />
                                        <Skeleton variant="text" width={80} height={15} />
                                        <Skeleton variant="text" width={120} height={15} />
                                    </div>
                                    <Skeleton variant="circular" width={24} height={24} />
                                </div>
                                <div className="bg-white mt-1 rounded-[10px] p-2 w-full">
                                    <div className="flex justify-between items-center mb-5">
                                        <div>
                                            <div className="flex justify-start items-center mb-1">
                                                <CalendarMonthIcon className="mr-2 text-gray-500" />
                                                <Skeleton variant="text" width={80} height={15} />
                                            </div>
                                            <Skeleton variant="text" width={100} height={15} />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            {Array.from({ length: 3 }).map((_, i) => (
                                                <Skeleton key={i} variant="circular" width={36} height={36} className="mr-2" />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-start items-center mb-1">
                                            <EmailIcon className="mr-2 text-gray-500" />
                                            <Skeleton variant="text" width={60} height={15} />
                                        </div>
                                        <Skeleton variant="text" width={140} height={15} />
                                    </div>
                                </div>
                            </div>
                        ))
                        : users.map((user, index) => (
                            <div
                                key={index}
                                className="
                                    hover:shadow-lg transition-shadow duration-300
                                    bg-[#f4f5f5] rounded-2xl
                                    w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[32%]
                                    max-w-full flex flex-col p-4 sm:p-5 mb-4
                                "
                            >
                                <div className="flex justify-between items-start mb-5">
                                    <div className="flex flex-col items-start">
                                        <img
                                            src="/profile-image.webp"
                                            alt=""
                                            className="w-[70px] h-[70px] rounded-full border-2 border-white max-w-full object-cover mb-2"
                                        />
                                        <h2 className="text-base sm:text-lg md:text-xl font-semibold">{user.name} {user.surname}</h2>
                                        <p className="text-gray-500 text-sm sm:text-base">
                                            {user.scientific_name} | {user.scientific_degree_name}
                                        </p>
                                    </div>
                                    <div>
                                        <Link to="/researcher-details" state={{ user }}>
                                            <MoreHorizIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="bg-white mt-1 rounded-[10px] p-2 sm:p-3">
                                    <div className="flex justify-between items-center mb-5 flex-wrap">
                                        <div className="mb-2 md:mb-0">
                                            <div className="flex justify-start items-center">
                                                <CalendarMonthIcon className="mr-2 text-gray-500 w-5 h-5 sm:w-6 sm:h-6" />
                                                <p className="text-gray-500 text-sm sm:text-base">Doğum tarixi</p>
                                            </div>
                                            <div>
                                                {user.birth_date && (
                                                    <span className="text-sm sm:text-base">{new Date(user.birth_date).toLocaleDateString('en-GB')}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap justify-between items-center gap-2">
                                            <div
                                                className="border border-gray-200 p-1 rounded-full cursor-pointer flex items-center justify-center min-w-[42px] min-h-[42px] mr-1"
                                            >
                                                <a href={user?.google_scholar_url} target="_blank" rel="noreferrer">
                                                    <img src="/linkedin-logo.webp" alt="linkedin" className="rounded-full w-9 h-9 max-w-full" />
                                                </a>
                                            </div>
                                            <div
                                                className="border border-gray-200 p-1 rounded-full cursor-pointer flex items-center justify-center min-w-[42px] min-h-[42px] mr-1"
                                            >
                                                <a href={user?.google_scholar_url} target="_blank" rel="noreferrer">
                                                    <img src="/google-scholar-logo.webp" alt="google scholar" className="rounded-full w-9 h-9 max-w-full" />
                                                </a>
                                            </div>
                                            <div
                                                className="border border-gray-200 p-1 rounded-full cursor-pointer flex items-center justify-center min-w-[42px] min-h-[42px] mr-1"
                                            >
                                                <a href={user?.scopus_url} target="_blank" rel="noreferrer">
                                                    <img src="/scopus-logo.webp" alt="scopus" className="rounded-full w-9 h-9 max-w-full" />
                                                </a>
                                            </div>
                                            <div
                                                className="border border-gray-200 p-1 rounded-full cursor-pointer flex items-center justify-center min-w-[42px] min-h-[42px]"
                                            >
                                                <a href={user?.webofscience_url} target="_blank" rel="noreferrer">
                                                    <img src="/web-of-science-logo.webp" alt="web of science" className="rounded-full w-9 h-9 max-w-full" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-start items-center">
                                            <EmailIcon className="mr-2 text-gray-500 w-5 h-5 sm:w-6 sm:h-6" />
                                            <p className="text-gray-500 text-sm sm:text-base">E-poçt</p>
                                        </div>
                                        <a href={`mailto:${user?.email}`} className="text-sm sm:text-base break-all">{user?.email}</a>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
