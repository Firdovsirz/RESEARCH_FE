import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import PublicHeader from "../publicHeader/PublicHeader";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { UserProfile } from "../../services/user/userService";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getWorkByFinCode, Work } from "../../services/work/workService";
import { getLanguageByFinCode, Language } from "../../services/language/languageService";
import { getPublicationByFinCode, Publication } from "../../services/publication/publicationService";
import { Article, getArticleByFinKod } from "../../services/article/articleService";
import { getInterCorpByFinCode, InterCorp } from "../../services/interCorp/InterCorpService";
import Cv from "../cv/Cv";
import { getCvByFinCode } from "../../services/cv/cvService";

export default function ResearcherDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const user: UserProfile = location.state?.user;
    const [loading, setLoading] = useState(false);
    const [cv, setCv] = useState("");
    const [works, setWorks] = useState<Work[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [interCorps, setInterCorps] = useState<InterCorp[]>([]);
    const [publications, setPublications] = useState<Publication[]>([]);

    console.log(user);

    useEffect(() => {
        getLanguageByFinCode(user?.fin_kod)
            .then(setLanguages)
        getWorkByFinCode(user?.fin_kod)
            .then(setWorks)
        getPublicationByFinCode(user?.fin_kod)
            .then(setPublications)
        getArticleByFinKod(user?.fin_kod)
            .then(setArticles)
        getInterCorpByFinCode(user?.fin_kod, "")
            .then(setInterCorps)
        getCvByFinCode(user?.fin_kod, "")
            .then(setCv)
    }, []);

    console.log(interCorps);


    console.log(languages);

    if (!user) {
        return (
            <>
                <PublicHeader />
                <p className="text-center mt-20">No user data found.</p>
            </>
        );
    }

    if (loading) {
        return (
            <>
                <PublicHeader />
                <div className="p-8 flex justify-between items-start gap-10">
                    {/* Left column skeleton */}
                    <div
                        className="border border-gray-300 rounded-[20px] animate-pulse"
                        style={{ width: "calc(100% / 3 - 80px)" }}
                    >
                        <div className="flex flex-col justify-center items-center p-8">
                            <div className="w-[200px] h-[200px] bg-gray-300 rounded-[20px] mb-[20px]" />
                            <div className="w-1/2 h-6 bg-gray-300 rounded mb-2"></div>
                            <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                        </div>
                        <div style={{ backgroundColor: "rgb(250, 251, 253)", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 10 }}>
                            <div className="flex justify-start items-center mb-[5px]">
                                <div className="mr-[10px] w-5 h-5 bg-gray-300 rounded"></div>
                                <div className="w-20 h-4 bg-gray-300 rounded"></div>
                            </div>
                            <div className="mb-[10px] w-28 h-4 bg-gray-200 rounded"></div>
                            <div className="flex justify-start items-center mb-[5px]">
                                <div className="mr-[10px] w-5 h-5 bg-gray-300 rounded"></div>
                                <div className="w-20 h-4 bg-gray-300 rounded"></div>
                            </div>
                            <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="flex justify-evenly items-center mt-[20px]">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        style={{
                                            border: "1px solid rgba(0,0,0,0.2)",
                                            padding: 5,
                                            borderRadius: "50%",
                                            minWidth: 50,
                                            minHeight: 50,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: i !== 3 ? 10 : 0
                                        }}
                                    >
                                        <div className="animate-pulse bg-gray-300 rounded-full w-9 h-9"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Middle column skeleton */}
                    <div className="flex flex-col justify-between items-center h-full animate-pulse" style={{ width: "calc(100% / 3 - 40px)" }}>
                        <div className="flex justify-between border border-gray-300 rounded-[20px] p-8 items-start mb-[30px] w-full">
                            <div className="flex-1 h-full">
                                <div className="flex justify-start items-center mb-[10px]">
                                    <div className="w-5 h-5 bg-gray-300 rounded mr-[10px]"></div>
                                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                                </div>
                                <ul>
                                    {[1, 2, 3].map((i) => (
                                        <li className="flex items-center gap-2 mb-2" key={i}>
                                            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                            <div className="w-24 h-4 bg-gray-200 rounded"></div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 h-full">
                                <div className="flex justify-start items-center mb-[10px]">
                                    <div className="w-5 h-5 bg-gray-300 rounded mr-[10px]"></div>
                                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                                </div>
                                <ul>
                                    {[1, 2, 3].map((i) => (
                                        <li className="flex items-center gap-2 mb-2" key={i}>
                                            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                            <div className="w-24 h-4 bg-gray-200 rounded"></div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between border border-gray-300 rounded-[20px] p-8 items-start w-full mb-[30px]">
                            <div className="flex justify-start items-center mb-[10px]">
                                <div className="w-5 h-5 bg-gray-300 rounded mr-[10px]"></div>
                                <div className="w-24 h-4 bg-gray-200 rounded"></div>
                            </div>
                            <ul>
                                {[1, 2, 3].map((i) => (
                                    <li className="flex items-center gap-2 mb-2" key={i}>
                                        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                        <div className="w-32 h-4 bg-gray-200 rounded"></div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col justify-between border border-gray-300 rounded-[20px] p-8 items-start w-full mt-[30px]">
                            <div className="flex justify-start items-center mb-[10px]">
                                <div className="w-5 h-5 bg-gray-300 rounded mr-[10px]"></div>
                                <div className="w-24 h-4 bg-gray-200 rounded"></div>
                            </div>
                            <ul>
                                {[1, 2, 3].map((i) => (
                                    <li className="flex items-center gap-2 mb-2" key={i}>
                                        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                        <div className="w-32 h-4 bg-gray-200 rounded"></div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Right column skeleton */}
                    <div className="flex flex-col justify-center items-center animate-pulse" style={{ width: "calc(100% / 3 - 40px)" }}>
                        <div className="flex justify-between border border-gray-300 rounded-[20px] p-8 items-start mb-[30px] w-full">
                            <div className="flex-1 h-full">
                                <div className="flex justify-start items-center mb-[10px]">
                                    <div className="w-5 h-5 bg-gray-300 rounded mr-[10px]"></div>
                                    <div className="w-32 h-4 bg-gray-200 rounded"></div>
                                </div>
                                <ul>
                                    {[1, 2, 3].map((i) => (
                                        <li className="flex items-center gap-2 mb-2" key={i}>
                                            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                            <div className="w-40 h-4 bg-gray-200 rounded"></div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex justify-between border border-gray-300 rounded-[20px] p-8 items-start mb-[30px] w-full">
                            <div className="flex-1 h-full">
                                <div className="flex justify-start items-center mb-[10px]">
                                    <div className="w-5 h-5 bg-gray-300 rounded mr-[10px]"></div>
                                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                                </div>
                                <div className="w-full h-8 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <PublicHeader />
            <div className="p-8 flex justify-between items-start gap-10">
                <div
                    className="border border-gray-300 rounded-[20px]"
                    style={{ width: "calc(100% / 3 - 80px)" }}>
                    <div className="flex flex-col justify-center items-center p-8">
                        <img src="/profile-image.webp" alt="" className="w-[200px] h-[200px] rounded-[20px] mb-[20px]" />
                        <h1>{user.name} {user.surname}</h1>
                        <p className="text-gray-500">{user.scientific_degree_name} | {user.scientific_name}</p>
                    </div>
                    <div style={{ backgroundColor: "rgb(250, 251, 253)", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 10 }}>
                        <div className="flex justify-start items-center mb-[5px]">
                            <EmailIcon className="mr-[10px] text-gray-500" /> <p className="text-gray-500">E-poçt</p>
                        </div>
                        <p className="mb-[10px]">{user.email}</p>
                        <div className="flex justify-start items-center mb-[5px]">
                            <CalendarMonthIcon className="mr-[10px] text-gray-500" /> <p className="text-gray-500">Doğum tarixi</p>
                        </div>
                        {user.birth_date && (
                            <span>{new Date(user.birth_date).toLocaleDateString('en-GB')}</span>
                        )}
                        <div className="flex justify-evenly items-center mt-[20px]">
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
                </div>

                {/* other details */}
                <div className="flex flex-col justify-between items-center h-full" style={{ width: "calc(100% / 3 - 40px)" }}>
                    <div className="flex justify-between border border-gray-300 rounded-[20px] p-8 items-start mb-[30px]">
                        <div className="flex-1 h-full">
                            <div className="flex justify-start items-center mb-[10px]">
                                <LanguageIcon className="text-gray-500 mr-[10px]" />
                                <p className="text-gray-500">Dil məlumatları</p>
                            </div>
                            <ul>
                                {languages.map((language, index) => {
                                    return (
                                        <li className="flex items-center gap-2" key={index}>
                                            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                            {language.language_name} ({language.language_short_name})
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="flex-1 h-full">
                            <div className="flex justify-start items-center mb-[10px]">
                                <WorkIcon className="text-gray-500 mr-[10px]" />
                                <p className="text-gray-500">İş yeri məlumatları</p>
                            </div>
                            <ul>
                                {works.map((work, index) => {
                                    return (
                                        <li className="flex items-center gap-2" key={index}>
                                            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                            {work.work_place} ({work.duty})
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between border border-gray-300 rounded-[20px] p-8 items-start w-full">
                        <div className="flex justify-start items-center mb-[10px]">
                            <BorderColorIcon className="text-gray-500 mr-[10px]" />
                            <p className="text-gray-500">Nəşrlərim</p>
                        </div>
                        <ul>
                            {publications.map((publication, index) => {
                                return (
                                    <li className="flex items-center gap-2" key={index}>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                        <a href={publication.publication_url}>{publication.publication_name}</a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="flex flex-col justify-between border border-gray-300 rounded-[20px] p-8 items-start w-full mt-[30px]">
                        <div className="flex justify-start items-center mb-[10px]">
                            <BorderColorIcon className="text-gray-500 mr-[10px]" />
                            <p className="text-gray-500">Məqalələrim</p>
                        </div>
                        <ul>
                            {articles.map((article, index) => {
                                return (
                                    <li className="flex items-center gap-2" key={index}>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                        <p>{article.article_field}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-between border border-gray-300 rounded-[20px] p-8 items-start mb-[30px]">
                        <div className="flex-1 h-full">
                            <div className="flex justify-start items-center mb-[10px]">
                                <LanguageIcon className="text-gray-500 mr-[10px]" />
                                <p className="text-gray-500">Beynəlxalq əlaqələr</p>
                            </div>
                            <ul>
                                {interCorps.map((interCorp, index) => {
                                    return (
                                        <li className="flex items-center gap-2" key={index}>
                                            <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                                            {interCorp.inter_corp_name} - {interCorp.name} {interCorp.surname} - {interCorp.email}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="flex justify-between border border-gray-300 rounded-[20px] p-8 items-start mb-[30px]">
                        <div className="flex-1 h-full">
                            <div className="flex justify-start items-center mb-[10px]">
                                <LanguageIcon className="text-gray-500 mr-[10px]" />
                                <p className="text-gray-500">CV</p>
                            </div>
                            <div onClick={() => navigate("/cv-view", { state: { cv } })}>

                            {cv}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}