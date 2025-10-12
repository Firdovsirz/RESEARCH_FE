import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ResearcherLayout from "../../layout/ResearcherLayout";


export default function ResearcherDetail() {
    const location = useLocation();
    const { user } = location.state || {};

    type CountKeys =
  | "publication"
  | "publicationWos"
  | "publicationScopus"
  | "citationScopus"
  | "hIndexWos"
  | "citationScholar"
  | "hIndexScopus"
  | "hIndexScholar"
  | "project"
  | "thesis"
  | "openAccess";

type Counts = Record<CountKeys, number>;

const [counts, setCounts] = useState<Counts>({
  publication: 0,
  publicationWos: 0,
  publicationScopus: 0,
  citationScopus: 0,
  hIndexWos: 0,
  citationScholar: 0,
  hIndexScopus: 0,
  hIndexScholar: 0,
  project: 0,
  thesis: 0,
  openAccess: 0,
});

useEffect(() => {
  const targets: Counts = {
    publication: 216,
    publicationWos: 216,
    publicationScopus: 216,
    citationScopus: 216,
    hIndexWos: 216,
    citationScholar: 216,
    hIndexScopus: 216,
    hIndexScholar: 216,
    project: 216,
    thesis: 216,
    openAccess: 216,
  };

  const interval = setInterval(() => {
    setCounts(prev => {
      const updated = { ...prev };
      let done = true;
      for (const key of Object.keys(targets) as CountKeys[]) {
        if (updated[key] < targets[key]) {
          updated[key] += 3;
          if (updated[key] > targets[key]) updated[key] = targets[key];
          done = false;
        }
      }
      if (done) clearInterval(interval);
      return updated;
    });
  }, 30);

  return () => clearInterval(interval);
}, []);

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
                            {counts.publication}
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Publication (WoS)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            {counts.publicationWos}
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Publication (Scopus)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            {counts.publicationScopus}
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Citation (Scopus)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            {counts.citationScopus}
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
                            {counts.hIndexWos}
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Citation (Scopus)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            {counts.citationScholar}
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            H-Index (Scopus)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            {counts.hIndexScopus}
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Citation (Scholar)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            {counts.citationScholar}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full">
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            H-Index (Scholar)
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            {counts.hIndexScholar}
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Project
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            {counts.project}
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Thesis Advisory
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            {counts.thesis}
                        </p>
                    </div>
                    <div className="border-l-4 border-gray-300 px-3 w-1/4">
                        <h2 className="text-gray-500 text-[20px] mb-[10px]">
                            Open Access
                        </h2>
                        <p className="text-gray-500 text-[20px]">
                            {counts.openAccess}
                        </p>
                    </div>
                </div>
            </div>
        </ResearcherLayout>
    );
}