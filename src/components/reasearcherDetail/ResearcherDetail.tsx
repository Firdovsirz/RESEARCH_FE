import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ResearcherLayout from "../../layout/ResearcherLayout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ScienceIcon from "@mui/icons-material/Science";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";

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
            publicationWos: 142,
            publicationScopus: 184,
            citationScopus: 850,
            hIndexWos: 12,
            citationScholar: 1205,
            hIndexScopus: 15,
            hIndexScholar: 18,
            project: 24,
            thesis: 8,
            openAccess: 95,
        };

        const interval = setInterval(() => {
            setCounts(prev => {
                const updated = { ...prev };
                let done = true;
                for (const key of Object.keys(targets) as CountKeys[]) {
                    if (updated[key] < targets[key]) {
                        updated[key] += Math.ceil(targets[key] / 20);
                        if (updated[key] > targets[key]) updated[key] = targets[key];
                        done = false;
                    }
                }
                if (done) clearInterval(interval);
                return updated;
            });
        }, 40);

        return () => clearInterval(interval);
    }, []);

    const metrics = [
        { label: "Total Publications", value: counts.publication, icon: MenuBookIcon, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
        { label: "Web of Science", value: counts.publicationWos, icon: PublicIcon, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
        { label: "Scopus Pubs", value: counts.publicationScopus, icon: ScienceIcon, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
        { label: "Scopus Citations", value: counts.citationScopus, icon: TrendingUpIcon, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
        { label: "H-Index (WoS)", value: counts.hIndexWos, icon: TrendingUpIcon, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20" },
        { label: "Scholar Citations", value: counts.citationScholar, icon: TrendingUpIcon, color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-900/20" },
        { label: "H-Index (Scopus)", value: counts.hIndexScopus, icon: TrendingUpIcon, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20" },
        { label: "H-Index (Scholar)", value: counts.hIndexScholar, icon: TrendingUpIcon, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
        { label: "Projects", value: counts.project, icon: AssignmentIcon, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
        { label: "Theses", value: counts.thesis, icon: SchoolIcon, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
        { label: "Open Access", value: counts.openAccess, icon: PublicIcon, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
    ];

    return (
        <ResearcherLayout user={user} heading="General Information">
            <div className="space-y-10">
                {/* Institutional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Institutional Areas</h3>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                            Azerbaijan Technical University | Academic Staff
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-100 dark:border-slate-800">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Academic Degree</h3>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {user?.scientific_name} {user?.scientific_degree_name}
                        </p>
                    </div>
                </div>

                {/* Research Areas */}
                <div className="bg-gray-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-gray-100 dark:border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                        <ScienceIcon className="text-blue-600" style={{ fontSize: 16 }} />
                        Research Expertise
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg italic">
                        "Agricultural Engineering, Artificial Intelligence in Agriculture, Water Resource Management, Renewable Energy Systems, Sustainable Ecology, and Advanced Plant Sciences."
                    </p>
                </div>

                {/* Metrics Grid */}
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <TrendingUpIcon className="text-blue-600" />
                        Academic Performance Metrics
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {metrics.map((m, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                                <div className={`${m.bg} ${m.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                                    <m.icon style={{ fontSize: 20 }} />
                                </div>
                                <span className="text-2xl font-black text-gray-900 dark:text-white tabular-nums">{m.value}</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1">{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ResearcherLayout>
    );
}