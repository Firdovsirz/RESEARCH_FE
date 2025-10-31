import Swal from "sweetalert2";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DropzoneComponent from "../form/form-elements/DropZone";
import { getCvByFinCode, addCv, deleteCv } from "../../services/cv/cvService";

export default function Cv() {
    const navigate = useNavigate();
    const [cv, setCv] = useState("");
    const [loading, setLoading] = useState(false);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);
    const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);

    useEffect(() => {
        setLoading(true);
        getCvByFinCode(fin_kod || "", token ? token : "")
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
                    title: "Uğurla əlavə olundu",
                    text: "CV uğurla əlavə edildi!"
                }).then(() => {
                    window.location.reload();
                });
            } else if (result === "NOT FOUND") {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "İstifadəçi tapılmadı!"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "Server xətası"
                });
            }
        } catch (err) {
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Xəta",
                text: "Server xətası"
            });
        }
    }
    console.log(cv);

    const handleCvDelete = async () => {
        const confirmResult = await Swal.fire({
            title: "CV-ni silmək istədiyinizə əminsiniz?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Bəli, sil",
            cancelButtonText: "Ləğv et"
        });

        if (confirmResult.isConfirmed) {
            try {
                setLoading(true);
                const result = await deleteCv(fin_kod || "", token || "");
                setLoading(false);

                if (result === "SUCCESS") {
                    Swal.fire({
                        icon: "success",
                        title: "CV uğurla silindi!"
                    }).then(() => window.location.reload());
                } else if (result === "NOT_FOUND") {
                    Swal.fire({
                        icon: "error",
                        title: "CV tapılmadı"
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Xəta baş verdi"
                    });
                }
            } catch (err) {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Xəta baş verdi"
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
                    <div className="flex flex-col justify-center items-center gap-4">
                        <DropzoneComponent onFileSelect={setCvFile} />
                        <Button onClick={handleWorkCreate} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                ) : (
                    <div
                        className="flex justify-between items-center border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <p className="text-gray-800 dark:text-gray-100 font-medium">
                            {(cv.split("/").pop() || cv)}
                        </p>
                        <div className="flex items-center">
                            <div onClick={() => navigate("/cv-view", { state: { cv } })} className="bg-blue-500 text-white p-2 rounded-[5px] inline-flex items-center justify-center mr-[10px]">
                                <VisibilityIcon />
                            </div>
                            <div className="bg-yellow-500 text-white p-2 rounded-[5px] inline-flex items-center justify-center">
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
                    </div>
                )}
            </div>
        </>
    )
}
