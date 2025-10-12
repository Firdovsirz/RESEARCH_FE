import { useEffect, useState } from "react";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { getCvByFinCode } from "../../services/cv/cvService";

export default function ResearchDetailsCv({ user }: { user: any }) {
    const [cv, setCv] = useState<string | null>(null);

    useEffect(() => {
        getCvByFinCode(user?.fin_kod, "")
        .then(setCv);
    }, []);

    if (!cv) return <div>Loading...</div>;

    return (
    <div
        style={{
            width: "100%",
            height: "80vh",
            margin: "20px auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
        }}
    >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={`http://localhost:8000/${cv}`} />
        </Worker>
    </div>
);
}