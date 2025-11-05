import { useEffect } from "react";
import { getUserProfile } from "../services/user/userService";
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
    const [imageBase64, setImageBase64] = useState<string>("");

    useEffect(() => {
        getUserProfile(user?.fin_kod ? user?.fin_kod : "",)
            .then((res) => {
                if (typeof res === "object") {
                    setImageBase64(res.profile_image ? `data:image/jpeg;base64,${res.profile_image}` : "");
                } else {
                    setImageBase64("");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const particlesInit = useCallback(async (engine: any) => {
        await loadFull(engine);
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div
                className={`fixed inset-0 bg-white/30 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMenuOpen(false)}
            ></div>

            <aside
                className={`fixed top-0 right-0 z-50 w-[250px] bg-gray-100 border-l border-gray-200 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 transform transition-transform duration-300
                ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
                md:relative md:translate-x-0 md:static
                `}
                style={{
                    display: menuOpen ? 'block' : undefined,
                }}
            >
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
                        <img
                            src={
                                imageBase64 ||
                                (user && user.image) ||
                                "/placeholder-profile.png"
                            }
                            alt="Profile image"
                            className="w-32 h-32 object-center object-contain rounded-full border border-gray-300"
                        />
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
                        <Link to={"/researcher-details"} state={{ user }} onClick={() => setMenuOpen(false)}>
                            <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-y border-gray-300 p-5">
                                <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                    Home page
                                </span>
                            </li>
                        </Link>
                        <Link to={"/researcher-details/education"} state={{ user }} onClick={() => setMenuOpen(false)}>
                            <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-b border-gray-300 p-5">
                                <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                    Education
                                </span>
                            </li>
                        </Link>
                        <Link to={"/researcher-details/areas"} state={{ user }} onClick={() => setMenuOpen(false)}>
                            <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-b border-gray-300 p-5">
                                <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                    Research Areas
                                </span>
                            </li>
                        </Link>
                        <Link to={"/researcher-details/experience"} state={{ user }} onClick={() => setMenuOpen(false)}>
                            <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-b border-gray-300 p-5">
                                <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                    Academic experience
                                </span>
                            </li>
                        </Link>
                        <Link to={"/researcher-details/cv"} state={{ user }} onClick={() => setMenuOpen(false)}>
                            <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer border-b border-gray-300 p-5">
                                <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                    CV
                                </span>
                            </li>
                        </Link>
                        <Link to={"/researcher-details/contact"} state={{ user }} onClick={() => setMenuOpen(false)}>
                            <li className="group font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200 cursor-pointer p-5">
                                <span className="inline-block transform transition-transform duration-200 group-hover:translate-x-3">
                                    Contact
                                </span>
                            </li>
                        </Link>
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