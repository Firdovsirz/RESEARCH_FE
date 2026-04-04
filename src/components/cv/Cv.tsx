import Swal from "sweetalert2";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import DeleteIcon from '@mui/icons-material/Delete';
import '@react-pdf-viewer/core/lib/styles/index.css';
import DownloadIcon from '@mui/icons-material/Download';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import DropzoneComponent from "../form/form-elements/DropZone";
import { getCvByFinCode, addCv, deleteCv } from "../../services/cv/cvService";

export default function Cv() {
    const [cv, setCv] = useState("");
    const [loading, setLoading] = useState(false);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);

    useEffect(() => {
        setLoading(true);
        getCvByFinCode(fin_kod || "")
            .then(setCv)
            .finally(() => {
                setLoading(false);
            });
    }, [fin_kod]);

    const handleWorkCreate = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('fin_kod', fin_kod || "");
            if (cvFile) {
                formData.append('cv', cvFile);
            }
            const result = await addCv(formData);
            setLoading(false);
            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Added",
                    text: "CV added successfully."
                }).then(() => {
                    window.location.reload();
                });
            } else if (result === "NOT FOUND") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "User not found."
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unexpected error occured. Please try again later."
                });
            }
        } catch (err) {
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unexpected error occured. Please try again later."
            });
        }
    }
    const handleCvDelete = async () => {
        const confirmResult = await Swal.fire({
            title: "Are you sure to delete?",
            text: "This action can not be recovered",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel"
        });

        if (confirmResult.isConfirmed) {
            try {
                setLoading(true);
                const result = await deleteCv(fin_kod || "");
                setLoading(false);

                if (result === "SUCCESS") {
                    Swal.fire({
                        icon: "success",
                        title: "Deleted",
                        text: "Resume deleted successfully.!"
                    }).then(() => window.location.reload());
                } else if (result === "NOT_FOUND") {
                    Swal.fire({
                        icon: "error",
                        title: "Resume not found."
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Unexpected error occured. Please try again later."
                    });
                }
            } catch (err) {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unexpected error occured. Please try again later."
                });
            }
        }
    };
    return (
        <>
            <div>
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm animate-pulse"
                        >
                            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        </div>
                    ))
                ) : cv === "NOT FOUND" ? (
                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <DropzoneComponent onFileSelect={setCvFile} />
                        <Button onClick={handleWorkCreate} disabled={loading || !cvFile}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center mb-[20px]">
                            <div className="bg-yellow-500 text-white p-2 rounded-[5px] inline-flex items-center justify-center cursor-pointer">
                                <DownloadIcon />
                            </div>
                            <div
                                className="ml-[10px] bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[5px] cursor-pointer"
                                onClick={handleCvDelete}
                                style={{ pointerEvents: loading ? "none" : "auto" }}
                            >
                                <DeleteIcon className="text-white" />
                            </div>
                        </div>
                        <div
                            className="flex justify-between items-center border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "80vh",
                                    margin: "20px auto",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                }}
                            >
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                    <Viewer fileUrl={`http://localhost:8000/${cv}`} />
                                </Worker>
                            </div >
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
