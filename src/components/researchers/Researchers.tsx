import { Link } from "react-router";
import { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import EmailIcon from '@mui/icons-material/Email';
import PublicHeader from '../publicHeader/PublicHeader';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getAllUsers, UserProfile } from "../../services/user/userService";

export default function Researchers() {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);
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

    console.log(users);

    return (
        <>
            <PublicHeader onSearch={setSearch} />
            <div className="flex flex-wrap gap-6 px-[40px] justify-start items-stretch">
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between items-center p-4 bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300
                                w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] max-w-full"
                            style={{ borderRadius: 20 }}
                        >
                            <div className='flex justify-between items-start w-full mb-4'>
                                <div className='flex flex-col items-center'>
                                    <Skeleton variant="circular" width={70} height={70} className='mb-2' />
                                    <Skeleton variant="text" width={100} height={20} />
                                    <Skeleton variant="text" width={80} height={15} />
                                    <Skeleton variant="text" width={120} height={15} />
                                </div>
                                <Skeleton variant="circular" width={24} height={24} />
                            </div>
                            <div className='bg-white mt-[5px] rounded-[10px] p-[10px] w-full'>
                                <div className="flex justify-between items-center mb-[20px]">
                                    <div>
                                        <div className='flex justify-start items-center mb-1'>
                                            <CalendarMonthIcon className='mr-[10px] text-gray-500' />
                                            <Skeleton variant="text" width={80} height={15} />
                                        </div>
                                        <Skeleton variant="text" width={100} height={15} />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <Skeleton key={i} variant="circular" width={36} height={36} className='mr-2' />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-start items-center mb-1">
                                        <EmailIcon className="mr-[10px] text-gray-500" />
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
                            className="hover:shadow-lg transition-shadow duration-300 bg-[#f4f5f5] p-5 rounded-[20px]
                                w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] max-w-full flex flex-col"
                        >
                            <div className='flex justify-between items-start mb-[20px]'>
                                <div>
                                    <img src="/profile-image.webp" alt="" className='w-[70px] h-[70px] rounded-full border-2 border-white' />
                                    <h2>{user.name} {user.surname}</h2>
                                    <p className="text-gray-500">{user.scientific_name} | {user.scientific_degree_name}</p>
                                </div>
                                <div>
                                    <Link to="/researcher-details" state={{ user }}>
                                        <MoreHorizIcon />
                                    </Link>
                                </div>
                            </div>
                            <div className='bg-white mt-[5px] rounded-[10px] p-[10px]'>
                                <div className="flex justify-between items-center mb-[20px]">
                                    <div>
                                        <div className='flex justify-start items-center'>
                                            <CalendarMonthIcon className='mr-[10px] text-gray-500' /> <p className='text-gray-500'>Doğum tarixi</p>
                                        </div>
                                        <div>
                                            {user.birth_date && (
                                                <span>{new Date(user.birth_date).toLocaleDateString('en-GB')}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div
                                            style={{
                                                border: "1px solid rgba(0,0,0,0.2)",
                                                padding: 5,
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                minWidth: 50,
                                                minHeight: 50,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginRight: 10
                                            }}
                                        >
                                            {loading ? (
                                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
                                            ) : (
                                                <a href={user?.google_scholar} target="_blank" rel="noreferrer">
                                                    <img src="/linkedin-logo.webp" alt="scopus" className="rounded-full w-9 h-9" />
                                                </a>
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                border: "1px solid rgba(0,0,0,0.2)",
                                                padding: 5,
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                minWidth: 50,
                                                minHeight: 50,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginRight: 10
                                            }}
                                        >
                                            {loading ? (
                                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
                                            ) : (
                                                <a href={user?.google_scholar} target="_blank" rel="noreferrer">
                                                    <img src="/google-scholar-logo.webp" alt="scopus" className="rounded-full w-9 h-9" />
                                                </a>
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                border: "1px solid rgba(0,0,0,0.2)",
                                                padding: 5,
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                minWidth: 50,
                                                minHeight: 50,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginRight: 10
                                            }}
                                        >
                                            {loading ? (
                                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
                                            ) : (
                                                <a href={user?.scopus} target="_blank" rel="noreferrer">
                                                    <img src="/scopus-logo.webp" alt="scopus" className="rounded-full w-9 h-9" />
                                                </a>
                                            )}
                                        </div>
                                        <div
                                            style={{
                                                border: "1px solid rgba(0,0,0,0.2)",
                                                padding: 5,
                                                borderRadius: "50%",
                                                cursor: "pointer",
                                                minWidth: 50,
                                                minHeight: 50,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            {loading ? (
                                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
                                            ) : (
                                                <a href={user?.web_of_science} target="_blank" rel="noreferrer">
                                                    <img src="/web-of-science-logo.webp" alt="scopus" className="rounded-full w-9 h-9" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-start items-center">
                                        <EmailIcon className="mr-[10px] text-gray-500" /> <p className="text-gray-500">E-poçt</p>
                                    </div>
                                    <a href={`mailto:${user?.email}`}>{user?.email}</a>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
