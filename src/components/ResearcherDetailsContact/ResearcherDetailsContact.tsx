import { useState, useEffect } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import CakeIcon from '@mui/icons-material/Cake';
import BadgeIcon from '@mui/icons-material/Badge';
import { UserProfile } from "../../services/user/userService";
import { Language } from '../../services/language/languageService';
import { getLanguageByFinCode } from '../../services/language/languageService';
import ContactPageIcon from "@mui/icons-material/ContactPage";

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
        <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-100 dark:border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                    <ContactPageIcon style={{ fontSize: 20 }} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact & Personal Info</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 space-y-4">
                    <div className="flex items-center gap-3">
                        <BadgeIcon className="text-blue-600" style={{ fontSize: 18 }} />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Full Name</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.name} {user?.surname}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <CakeIcon className="text-blue-600" style={{ fontSize: 18 }} />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Birth Date</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                {user?.birth_date ? new Date(user.birth_date).toLocaleDateString('en-GB') : '—'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <EmailIcon className="text-blue-600" style={{ fontSize: 18 }} />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email Address</p>
                            <a href={`mailto:${user?.email}`} className="text-sm font-bold text-blue-600 hover:underline">{user?.email}</a>
                        </div>
                    </div>
                </div>

                {/* Languages */}
                <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <LanguageIcon className="text-blue-600" style={{ fontSize: 18 }} />
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Languages</h3>
                    </div>
                    {loading ? (
                        <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
                            <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/3" />
                        </div>
                    ) : languages.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {languages.map((lang, index) => (
                                <span key={index} className="px-3 py-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg text-xs font-bold text-gray-700 dark:text-gray-300">
                                    {lang.language_name}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-gray-500 italic">No languages specified.</p>
                    )}
                </div>
            </div>

            {/* Bio */}
            {user?.bio && (
                <div className="bg-gray-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-gray-100 dark:border-slate-800">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Biography</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                        {user.bio}
                    </p>
                </div>
            )}
        </div>
    );
}