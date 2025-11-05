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
            .then((res) => {
                if (res === "NO CONTENT") {
                    setAreas(res);
                } else if (res === "NO CONTENT") {
                    setAreas([]);
                } else if (res === "NOT FOUND") {
                    setAreas([]);
                } else {
                    setAreas([]);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return (
        <div className="flex flex-col items-start">
            <div className="relative text-gray-500 text-[20px] mb-[10px]">
                Research Areas
                {areas.length !== 0 ? (
                    <div className="absolute bg-blue-500 text-white top-[-10px] right-[-22px] w-6 h-6 rounded-full flex items-center justify-center text-[14px]">
                        {loading ? (
                            <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
                        ) : (
                            areas.length
                        )}
                    </div>
                ) : null}
            </div>
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
                    areas.length === 0 ? (
                        <div className="flex justify-center items-center text-gray-500 py-[20px] px-3 w-full">
                            No research areas found
                        </div>
                    ) : (
                        areas.map((area, index) => (
                            <div className="border-b-2 border-gray-300 px-3 w-full py-[20px]" key={index}>
                                <h2 className="text-[20px] mb-[10px] font-bold">
                                    {area.area}
                                </h2>
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    )
}