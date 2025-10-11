import { useLocation } from "react-router";
import ResearcherLayout from "../../layout/ResearcherLayout";


export default function ResearcherDetailsEducation() {
    const location = useLocation();
    const { user } = location.state || {};

    return (
        <ResearcherLayout user={user} heading="Education">
            <div className="flex flex-col items-start">
                <h2 className="relative text-gray-500 text-[20px] mb-[10px]">
                    Educational Details
                    <div className="absolute bg-blue-500 text-white top-[-10px] right-[-22px] w-6 h-6 rounded-full flex items-center justify-center text-[14px]">
                        3
                    </div>
                </h2>
                <div className="flex flex-col justify-between items-center w-full">
                    <div className="border-b-2 border-gray-300 px-3 w-full py-[20px]">
                        <p className="text-gray-500 text-[16px]">
                            2029-2032
                        </p>
                        <h2 className="text-[20px] mb-[10px] font-bold">
                            Doctorate
                        </h2>
                        <p className="text-gray-500 text-[15px]">
                            EPFL | Computer Science
                        </p>
                    </div>
                    <div className="border-b-2 border-gray-300 px-3 w-full py-[20px]">
                        <p className="text-gray-500 text-[16px]">
                            2027-2029
                        </p>
                        <h2 className="text-[20px] mb-[10px] font-bold">
                            Postgraduate
                        </h2>
                        <p className="text-gray-500 text-[15px]">
                            University of Tartu | Software Development
                        </p>
                    </div>
                    <div className="border-b-2 border-gray-300 px-3 w-full py-[20px]">
                        <p className="text-gray-500 text-[16px]">
                            2023-2027
                        </p>
                        <h2 className="text-[20px] mb-[10px] font-bold">
                            Undergraduate
                        </h2>
                        <p className="text-gray-500 text-[15px]">
                            Azerbaijan Technical University | Computer Science
                        </p>
                    </div>
                </div>
            </div>
        </ResearcherLayout>
    );
}