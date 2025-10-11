import { useEffect } from "react";
import { useLocation } from "react-router";
import ResearcherLayout from "../../layout/ResearcherLayout";


export default function ResearcherDetail() {
    const location = useLocation();
    const { user } = location.state || {};

    return (
        <ResearcherLayout user={user} heading="General Information">
            <div className="flex flex-col items-start">
                <div className="flex justify-start items-center mb-[10px]">
                    <p>
                        <span className="font-bold mr-[10px]">
                            Instutional Areas:
                        </span>
                        Azerbaijan Technical University | Teacher
                    </p>
                </div>
                <div className="flex justify-start items-center mb-[60px]">
                    <p>
                        <span className="font-bold mr-[10px]">
                            Research Areas:
                        </span>
                        Agricultural Engineering, Agriculture Dairy & Animal Science, Water Resources, Agriculture Multidisciplinary, Agronomy, Horticulture, Plant Sciences, Environment/Ecology, Agricultural Sciences, Plant & Animal Science, Environmental Sciences, Agriculture & Environment Sciences (Age)
                    </p>
                </div>
                <h2 className="text-gray-500 text-[20px] mb-[10px]">
                    Metrics
                </h2>
                <div className="flex justify-between items-center w-full mb-[30px]">
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Publication
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Publication (WoS)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Publication (Scopus)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Citation (Scopus)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                </div>

                {/* 2nd line */}
                <div className="flex justify-between items-center w-full mb-[30px]">
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            H-Index (WoS)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Citation (Scopus)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            H-Index (Scopus)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Citation (Scholar)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full">
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            H-Index (Scholar)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Project
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Thesis Advisory
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Open Access
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            216
                        </p>
                    </div>
                </div>
            </div>
        </ResearcherLayout>
    );
}