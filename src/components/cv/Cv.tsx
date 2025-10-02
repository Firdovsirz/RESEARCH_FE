import Swal from "sweetalert2";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useModal } from "../../hooks/useModal";
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DropzoneComponent from "../form/form-elements/DropZone";
import { getCvByFinCode, addCv } from "../../services/cv/cvService";

export default function Cv() {
    const navigate = useNavigate();
    const [cv, setCv] = useState("");
    const [loading, setLoading] = useState(false);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const { isOpen, openModal, closeModal } = useModal();
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
            closeModal();
            setLoading(false);
            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Uğurla əlavə olundu",
                    text: "CV uğurla əlavə edildi!"
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
            closeModal();
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Xəta",
                text: "Server xətası"
            });
        }
    }
    console.log(cv);

    console.log(cv);
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
                ) : cv.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <div className="bg-yellow-200 text-yellow-800 w-[110px] flex justify-center items-center rounded-[20px] px-[5px]">Mövcud deyil</div>
                    </div>
                ) : (
                    <div
                        className="flex justify-between items-center border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <p className="text-gray-800 dark:text-gray-100 font-medium">
                            {(cv.split("/").pop() || cv)}
                        </p>
                        <div>
                            <div onClick={() => navigate("/cv-view", { state: { cv } })} className="bg-blue-500 text-white p-2 rounded-[5px] inline-flex items-center justify-center mr-[10px]">
                                <VisibilityIcon />
                            </div>
                            <div className="bg-yellow-500 text-white p-2 rounded-[5px] inline-flex items-center justify-center">
                                <DownloadIcon />
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-end items-end">
                    <Button onClick={openModal}>
                        Yeni cv
                    </Button>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                className="max-w-[700px] p-6 lg:p-10"
            >
                <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                    <div>
                        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                            Yeni cv
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Yeni cd əlavə etmək üçün cv-ni daxil edib yadda saxlayın!
                        </p>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div>
                                <DropzoneComponent onFileSelect={setCvFile} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                        >
                            Bağla
                        </button>
                        <button
                            onClick={handleWorkCreate}
                            type="button"
                            disabled={loading}
                            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                        >
                            {loading ? "Yadda saxlanılır" : "Yadda saxla"}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
