import { useEffect, useState } from "react";
import { UserProfile } from "../../services/user/userService";
import { Education, getEducations } from "../../services/education/educationService";

interface ResearchAreasProps {
    user: UserProfile;
}

export default function ResearcherDetailsEducation({ user }: ResearchAreasProps) {
    const [educations, setEducations] = useState<Education[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getEducations(user?.fin_kod)
            .then(setEducations)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col items-start">
            <h2 className="relative text-gray-500 text-[20px] mb-[10px]">
                Educational Details
                <div className="absolute bg-blue-500 text-white top-[-10px] right-[-22px] w-6 h-6 rounded-full flex items-center justify-center text-[14px]">
                    {loading ? (
                        <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
                    ) : (
                        educations.length
                    )}
                </div>
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
                ) : (
                    educations.map((education, index) => {
                        return (
                            <div key={index} className="border-b-2 border-gray-300 px-3 w-full py-[20px]">
                                <p className="text-gray-500 text-[16px]">
                                    {education.start_date} - {education.end_date ? education.end_date : "present"}
                                </p>
                                <h2 className="text-[20px] mb-[10px] font-bold">
                                    {education.title}
                                </h2>
                                <p className="text-gray-500 text-[15px]">
                                    {education.university}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}