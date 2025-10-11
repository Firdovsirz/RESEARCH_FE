import { useEffect, useState } from 'react';
import { UserProfile } from '../../services/user/userService';
import { getAreas, ResearchArea } from '../../services/reasearchArea/researchAreaService';

interface ResearchAreasProps {
    user: UserProfile
}

export default function ResearcherDetailsArea({ user }: ResearchAreasProps) {
    const [loading, setLoading] = useState(false);
    const [areas, setAreas] = useState<ResearchArea[]>([]);

    useEffect(() => {
        setLoading(true);
        getAreas(user?.fin_kod)
            .then(setAreas)
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return (
        <div className="flex flex-col items-start">
            <h2 className="text-gray-500 text-[20px] mb-[10px]">
                Educational Details
            </h2>
            <div className="flex flex-col justify-between items-center w-full">
                {loading ? (
                    <div className="w-full">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="animate-pulse flex flex-col gap-3 border-b-2 border-gray-200 py-4 px-3 w-full py-[20px]">
                                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    areas.map((area, index) => (
                        <div className="border-b-2 border-gray-300 px-3 w-full py-[20px]" key={index}>
                            <h2 className="text-[20px] mb-[10px] font-bold">
                                {area.area}
                            </h2>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}