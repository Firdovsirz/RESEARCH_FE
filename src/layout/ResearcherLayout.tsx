import { Link } from "react-router";
import { ReactNode, useState } from "react";
import { UserProfile } from "../services/user/userService";
import PublicHeader from "../components/publicHeader/PublicHeader";

interface ResearcherLayoutProps {
    children: ReactNode;
    user: UserProfile;
    heading?: string
}

export default function ResearcherLayout({ children, user, heading }: ResearcherLayoutProps) {
    const [loading, setLoading] = useState(false);
    return (
        <div className="flex min-h-screen">
            <aside className="w-[250px] bg-gray-100 border-r border-gray-200 h-screen sticky top-0">
                <div className="p-5 flex justify-center items-center">
                    <img src={user.image || "/profile-image.webp"} alt={`${user.name} ${user.surname}`} className="mb-4 w-[150px] object-cover rounded-full" />
                </div>
                <div className="mb-2 p-5 flex flex-col justify-center items-center">
                    <h2 className="text-lg font-semibold">{user.name} {user.surname}</h2>
                    <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 justify-center justify-items-center px-5 mb-2">
                    <div
                        className="border border-black/20 rounded-full cursor-pointer min-w-[50px] min-h-[50px] flex items-center justify-center"
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
                        className="border border-black/20 rounded-full cursor-pointer min-w-[50px] min-h-[50px] flex items-center justify-center"
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
                        className="border border-black/20 rounded-full cursor-pointer min-w-[50px] min-h-[50px] flex items-center justify-center"
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
                        className="border border-black/20 rounded-full cursor-pointer min-w-[50px] min-h-[50px] flex items-center justify-center"
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
                <ul>
                    <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-y border-gray-300 p-5">
                        <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                            <Link to={"/researcher-details"} state={{ user }}>
                                Home page
                            </Link>
                        </span>
                    </li>
                    <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-b border-gray-300 p-5">
                        <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                            <Link to={"/researcher-details/education"} state={{ user }}>
                                Education
                            </Link>
                        </span>
                    </li>
                    <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-b border-gray-300 p-5">
                        <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                            <Link to={"/researcher-details/areas"} state={{ user }}>
                                Research Areas
                            </Link>
                        </span>
                    </li>
                    <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-b border-gray-300 p-5">
                        <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                            <Link to={"/researcher-details/experience"} state={{ user }}>
                                Academic experience
                            </Link>
                        </span>
                    </li>
                    <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer p-5">
                        <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                            <Link to={"/researcher-details/contact"} state={{ user }}>
                                Contact
                            </Link>
                        </span>
                    </li>
                </ul>
            </aside>

            <div className="flex flex-col w-[calc(100%-250px)] min-h-screen">
                <header className="relative border-b-2 py-4 shadow-md h-[160px]">
                    <PublicHeader />
                    <p className="absolute bottom-0 left-4 text-lg font-semibold border-b-4 border-blue-500">
                        {heading}
                    </p>
                </header>
                <main className="flex-1 p-8 bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
}