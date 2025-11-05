import { useEffect, useState } from "react";
import { UserProfile } from "../../services/user/userService";
import { Experience, getExperiences } from "../../services/work/workService";

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
    }, []);

    return (
        <div className="flex flex-col items-start">
            <h2 className="relative text-gray-500 text-[20px] mb-[10px]">
                Academic experience details
                {Array.isArray(experiences) && experiences.length !== 0 ? (
                    <div className="absolute bg-blue-500 text-white top-[-10px] right-[-22px] w-6 h-6 rounded-full flex items-center justify-center text-[14px]">
                        {loading ? (
                            <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
                        ) : (
                            experiences.length
                        )}
                    </div>
                ) : null}
            </h2>
            <div className="flex flex-col justify-between items-center w-full">
                {loading ? (
                    <div className="flex flex-col space-y-4 w-full animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="border-b-2 border-gray-300 px-3 w-full py-[20px]">
                                <div className="h-4 bg-gray-300 rounded w-1/6 mb-3"></div>
                                <div className="h-5 bg-gray-400 rounded w-1/5 mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        ))}
                    </div>
                ) : Array.isArray(experiences) && experiences.length > 0 ? (
                    experiences.map((experience, index) => {
                        return (
                            <div key={index} className="border-b-2 border-gray-300 px-3 w-full py-[20px]">
                                <p className="text-gray-500 text-[16px]">
                                    {experience.start_date} - {experience.end_date ? experience.end_date : "present"}
                                </p>
                                <h2 className="text-[20px] mb-[10px] font-bold">
                                    {experience.title}
                                </h2>
                                <p className="text-gray-500 text-[15px]">
                                    {experience.university}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500 text-[16px] py-[20px]">No experience details found</p>
                )}
            </div>
        </div>
    );
}