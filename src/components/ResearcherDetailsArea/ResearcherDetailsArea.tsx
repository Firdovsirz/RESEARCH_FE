import { useEffect, useState } from 'react';
import { UserProfile } from '../../services/user/userService';
import { getAreas, ResearchArea } from '../../services/reasearchArea/researchAreaService';
import ScienceIcon from "@mui/icons-material/Science";

interface ResearchAreasProps {
    user: UserProfile
}

export default function ResearcherDetailsArea({ user }: ResearchAreasProps) {
    const [loading, setLoading] = useState(false);
    const [areas, setAreas] = useState<ResearchArea[]>([]);

    useEffect(() => {
        setLoading(true);
        getAreas(user?.fin_kod)
            .then((res) => {
                if (Array.isArray(res)) {
                    setAreas(res);
                } else {
                    setAreas([]);
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
                    <ScienceIcon style={{ fontSize: 20 }} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Research Expertise</h2>
                {!loading && areas.length > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold">
                        {areas.length}
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-3">
                {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-10 w-32 bg-gray-100 dark:bg-slate-800 rounded-xl animate-pulse" />
                    ))
                ) : areas.length === 0 ? (
                    <p className="text-gray-500 italic">No research areas specified.</p>
                ) : (
                    areas.map((area, index) => (
                        <div
                            key={index}
                            className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm hover:border-blue-400 hover:text-blue-600 transition-all cursor-default"
                        >
                            {area.area}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}