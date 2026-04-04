import { useEffect, useState } from "react";
import { UserProfile } from "../../services/user/userService";
import { Experience, getExperiences } from "../../services/work/workService";
import WorkIcon from "@mui/icons-material/Work";

interface ResearchAreasProps {
    user: UserProfile
}

export default function ResearcherDetailsExperience({ user }: ResearchAreasProps) {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getExperiences(user?.fin_kod)
            .then((res) => setExperiences(Array.isArray(res) ? res : []))
            .finally(() => {
                setLoading(false);
            });
    }, [user?.fin_kod]);

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-100 dark:border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                    <WorkIcon style={{ fontSize: 20 }} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Academic Experience</h2>
                {!loading && experiences.length > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold">
                        {experiences.length}
                    </span>
                )}
            </div>

            <div className="relative border-l-2 border-gray-100 dark:border-slate-800 ml-5 pl-8 space-y-10">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="relative animate-pulse">
                            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gray-200 dark:bg-slate-800" />
                            <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-24 mb-3" />
                            <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-1/2 mb-2" />
                            <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/3" />
                        </div>
                    ))
                ) : experiences.length === 0 ? (
                    <p className="text-gray-500 italic">No academic experience found.</p>
                ) : (
                    experiences.map((experience, index) => (
                        <div key={index} className="relative group">
                            {/* Dot */}
                            <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-slate-950 border-4 border-blue-600 group-hover:scale-125 transition-transform duration-300" />
                            
                            <div className="flex flex-col">
                                <span className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">
                                    {experience.start_date} — {experience.end_date ? experience.end_date : "Present"}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                    {experience.title}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
                                    {experience.university}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}