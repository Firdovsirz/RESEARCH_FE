import { useState, useEffect } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import { UserProfile } from "../../services/user/userService";
import { Language } from '../../services/language/languageService';
import { getLanguageByFinCode } from '../../services/language/languageService';

interface ResearchAreasProps {
    user: UserProfile
}

export default function ResearcherDetailsContact({ user }: ResearchAreasProps) {
    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
        setLoading(true);
        getLanguageByFinCode(user?.fin_kod)
            .then((res) => {
                if (res && Array.isArray(res)) {
                    setLanguages(res);
                } else {
                    setLanguages([]);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user?.fin_kod]);

    return (
        <div className="flex flex-col items-start">
            <h2 className="relative text-gray-500 text-[20px] mb-[10px]">
                Contact and Personal Details
            </h2>
            <div className="flex flex-col justify-between items-center w-full">
                <div className="border-b-2 border-gray-300 px-3 w-full py-[20px]">
                    <p className="text-gray-500 text-[16px]">
                        Name: <span className="font-bold text-[#000]">{user?.name}</span>
                    </p>
                    <p className="text-gray-500 text-[16px]">
                        Surname: <span className="font-bold text-[#000]">{user?.surname}</span>
                    </p>
                    <p className="text-gray-500 text-[16px]">
                        Birth Date: <span className="font-bold text-[#000]">{user?.birth_date ? new Date(user.birth_date).toLocaleDateString('en-GB') : ''}</span>
                    </p>
                    {user.bio ? (
                        <p className="text-gray-500 text-[16px]">
                            Bio: <span className="font-bold text-[#000]">{user?.bio}</span>
                        </p>
                    ) : null}
                </div>
                <div className="border-b-2 border-gray-300 px-3 w-full py-[20px]">
                    <p className="flex justify-start items-center text-gray-500 text-[16px]">
                        <EmailIcon className='mr-[10px]' /> Email:&nbsp;<span className="font-bold text-[#000]">{user?.email}</span>
                    </p>
                </div>
                {languages.length !== 0 ? (
                    <div className="border-b-2 border-gray-300 px-3 w-full py-[20px]">
                        <p className="flex justify-start items-center text-gray-500 text-[16px]">
                            <LanguageIcon className='mr-[10px]' /> Languages
                        </p>
                        <ul className="list-disc pl-5 ml-[30px]">
                            {languages.map((language, index) => {
                                return (
                                    <li key={index}>
                                        {language.language_name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ) : null}
                <div className="border-b-2 border-gray-300 px-3 w-full py-[20px]">
                    <div className="flex justify-start mb-2">
                        <div
                            className="border border-black/20 rounded-full cursor-pointer min-w-[50px] min-h-[50px] flex items-center justify-center mr-[20px]"
                        >
                            {loading ? (
                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
                            ) : (
                                <a href={user?.google_scholar_url} target="_blank" rel="noreferrer">
                                    <img src="/linkedin-logo.webp" alt="scopus" className="rounded-full w-9 h-9" />
                                </a>
                            )}
                        </div>
                        <div
                            className="border border-black/20 rounded-full cursor-pointer min-w-[50px] min-h-[50px] flex items-center justify-center mr-[20px]"
                        >
                            {loading ? (
                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
                            ) : (
                                <a href={user?.google_scholar_url} target="_blank" rel="noreferrer">
                                    <img src="/google-scholar-logo.webp" alt="scopus" className="rounded-full w-9 h-9" />
                                </a>
                            )}
                        </div>
                        <div
                            className="border border-black/20 rounded-full cursor-pointer min-w-[50px] min-h-[50px] flex items-center justify-center mr-[20px]"
                        >
                            {loading ? (
                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
                            ) : (
                                <a href={user?.scopus_url} target="_blank" rel="noreferrer">
                                    <img src="/scopus-logo.webp" alt="scopus" className="rounded-full w-9 h-9" />
                                </a>
                            )}
                        </div>
                        <div
                            className="border border-black/20 rounded-full cursor-pointer min-w-[50px] min-h-[50px] flex items-center justify-center mr-[20px]"
                        >
                            {loading ? (
                                <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-full w-15 h-15"></div>
                            ) : (
                                <a href={user?.webofscience_url} target="_blank" rel="noreferrer">
                                    <img src="/web-of-science-logo.webp" alt="scopus" className="rounded-full w-9 h-9" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}