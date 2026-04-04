import { useEffect, useState } from "react";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { getCvByFinCode } from "../../services/cv/cvService";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function ResearchDetailsCv({ user }: { user: any }) {
    const [cv, setCv] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getCvByFinCode(user?.fin_kod)
            .then((res) => {
                if (res === "NOT FOUND") setCv(null);
                else setCv(res);
            })
            .finally(() => setLoading(false));
    }, [user?.fin_kod]);

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-100 dark:border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                    <AttachFileIcon style={{ fontSize: 20 }} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Curriculum Vitae</h2>
            </div>

            {loading ? (
                <div className="h-[60vh] bg-gray-50 dark:bg-slate-800/50 rounded-3xl animate-pulse flex items-center justify-center text-gray-400">
                    Loading Resume...
                </div>
            ) : !cv ? (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700">
                    <AttachFileIcon className="text-gray-300 dark:text-slate-600 mb-4" style={{ fontSize: 48 }} />
                    <p className="text-gray-500 italic">Resume not found for this researcher.</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm h-[80vh]">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={`http://localhost:8000/${cv}`} />
                    </Worker>
                </div >
            )}
        </div>
    );
}