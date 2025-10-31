import { Link } from "react-router";
import { ReactNode, useState, useCallback } from "react";
import { UserProfile } from "../services/user/userService";
import PublicHeader from "../components/publicHeader/PublicHeader";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

interface ResearcherLayoutProps {
    children: ReactNode;
    user: UserProfile;
    heading?: string
}

export default function ResearcherLayout({ children, user, heading }: ResearcherLayoutProps) {
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const particlesInit = useCallback(async (engine: any) => {
        await loadFull(engine);
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-white/30 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMenuOpen(false)}
            ></div>

            <aside
                className={`fixed top-0 right-0 z-50 w-[250px] bg-gray-100 border-l border-gray-200 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 transform transition-transform duration-300
                ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
                md:relative md:translate-x-0 md:static
                `}
                style={{
                    // On small screens, show only if menuOpen; on md+, always visible
                    display: menuOpen ? 'block' : undefined,
                    // On md+, always visible (block), on sm, hidden unless menuOpen
                }}
            >
                {/* Particles background for aside */}
                <Particles
                    className="absolute inset-0 z-0"
                    id="aside-particles"
                    init={particlesInit}
                    options={{
                        fullScreen: { enable: false },
                        background: { color: "transparent" },
                        fpsLimit: 60,
                        interactivity: {
                            events: {
                                onHover: { enable: false },
                                onClick: { enable: false },
                                resize: true,
                            },
                        },
                        particles: {
                            color: { value: "#3b82f6" },
                            collisions: { enable: false },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: "out",
                                random: false,
                                speed: 0.4,
                                straight: false,
                            },
                            number: {
                                density: { enable: true, area: 800 },
                                value: 120,
                            },
                            opacity: { value: 0.28 },
                            shape: { type: "circle" },
                            size: { value: { min: 1, max: 3 } },
                        },
                        detectRetina: true,
                    }}
                />
                <div className="relative z-10">
                    <div className="p-5 flex justify-center items-center">
                        <img src={"/profile-image.webp"} alt={`${user.name} ${user.surname}`} className="mb-4 max-w-full w-[150px] object-cover rounded-full" />
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
                                <a href={user?.google_scholar_url} target="_blank" rel="noreferrer">
                                    <img src="/linkedin-logo.webp" alt="scopus" className="rounded-full max-w-full w-9 h-9" />
                                </a>
                            )}
                        </div>
                        <div
                            className="border border-black/20 rounded-full cursor-pointer min-w-[50px] min-h-[50px] flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
                            ) : (
                                <a href={user?.google_scholar_url} target="_blank" rel="noreferrer">
                                    <img src="/google-scholar-logo.webp" alt="scopus" className="rounded-full max-w-full w-9 h-9" />
                                </a>
                            )}
                        </div>
                        <div
                            className="border border-black/20 rounded-full cursor-pointer min-w-[50px] min-h-[50px] flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
                            ) : (
                                <a href={user?.scopus_url} target="_blank" rel="noreferrer">
                                    <img src="/scopus-logo.webp" alt="scopus" className="rounded-full max-w-full w-9 h-9" />
                                </a>
                            )}
                        </div>
                        <div
                            className="border border-black/20 rounded-full cursor-pointer min-w-[50px] min-h-[50px] flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
                            ) : (
                                <a href={user?.webofscience_url} target="_blank" rel="noreferrer">
                                    <img src="/web-of-science-logo.webp" alt="scopus" className="rounded-full max-w-full w-9 h-9" />
                                </a>
                            )}
                        </div>
                    </div>
                    <ul>
                        <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-y border-gray-300 p-5">
                            <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                <Link to={"/researcher-details"} state={{ user }} onClick={() => setMenuOpen(false)}>
                                    Home page
                                </Link>
                            </span>
                        </li>
                        <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-b border-gray-300 p-5">
                            <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                <Link to={"/researcher-details/education"} state={{ user }} onClick={() => setMenuOpen(false)}>
                                    Education
                                </Link>
                            </span>
                        </li>
                        <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-b border-gray-300 p-5">
                            <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                <Link to={"/researcher-details/areas"} state={{ user }} onClick={() => setMenuOpen(false)}>
                                    Research Areas
                                </Link>
                            </span>
                        </li>
                        <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-b border-gray-300 p-5">
                            <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                <Link to={"/researcher-details/experience"} state={{ user }} onClick={() => setMenuOpen(false)}>
                                    Academic experience
                                </Link>
                            </span>
                        </li>
                        <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-b border-gray-300 p-5">
                            <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                <Link to={"/researcher-details/cv"} state={{ user }} onClick={() => setMenuOpen(false)}>
                                    CV
                                </Link>
                            </span>
                        </li>
                        <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer p-5">
                            <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                <Link to={"/researcher-details/contact"} state={{ user }} onClick={() => setMenuOpen(false)}>
                                    Contact
                                </Link>
                            </span>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="flex flex-col flex-1 w-full md:w-[calc(100%-250px)] min-h-screen">
                <header className="relative border-b-2 py-4 md:py-15 shadow-md h-[160px] md:h-[160px] overflow-hidden flex flex-col justify-center items-center">
                    <Particles
                        className="absolute inset-0 z-0"
                        id="tsparticles"
                        init={particlesInit}
                        options={{
                            fullScreen: { enable: false },
                            background: { color: "red" },
                            fpsLimit: 60,
                            interactivity: {
                                events: {
                                    onHover: { enable: true, mode: "grab" },
                                    onClick: { enable: true, mode: "push" },
                                    resize: true,
                                },
                                modes: {
                                    repulse: { distance: 70, duration: 0.4 },
                                    grab: { distance: 100, line_linked: { opacity: 1 } },
                                    push: { quantity: 4 }
                                },
                            },
                            particles: {
                                color: { value: "#3b82f6" },
                                links: {
                                    color: "#3b82f6",
                                    distance: 150,
                                    enable: true,
                                    opacity: 0.6,
                                    width: 2,
                                },
                                collisions: { enable: false },
                                move: {
                                    direction: "none",
                                    enable: true,
                                    outModes: "out",
                                    random: false,
                                    speed: 0.6,
                                    straight: false,
                                },
                                number: {
                                    density: { enable: true, area: 800 },
                                    value: 120,
                                },
                                opacity: { value: 0.45 },
                                shape: { type: "circle" },
                                size: { value: { min: 2, max: 4 } },
                            },
                            detectRetina: true,
                        }}
                    />
                    <div className="relative z-10 w-full flex items-center justify-between px-4 md:px-0">
                        <PublicHeader toggleMenu={() => setMenuOpen(!menuOpen)} />
                        <div className="w-6 md:w-0"></div>{/* spacer for alignment */}
                    </div>
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