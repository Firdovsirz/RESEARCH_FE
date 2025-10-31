import Swal from "sweetalert2";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useModal } from "../../hooks/useModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createExperience, Experience, ExperiencePayload, getExperiences, updateExperience, deleteExperience } from "../../services/work/workService";

export default function MyWorks() {
    const [duty, setDuty] = useState("");
    const [loading, setLoading] = useState(false);
    const [works, setWorks] = useState<Experience[]>([]);
    const [workPlace, setWorkPlace] = useState("");
    const [endDate, setEndDate] = useState<number>();
    const [startDate, setStartDate] = useState<number>();
    const { isOpen, openModal, closeModal } = useModal();
    const token = useSelector((state: RootState) => state.auth.token);
    const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);
    const [editMode, setEditMode] = useState(false);
    const [editCode, setEditCode] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        getExperiences(fin_kod || "")
            .then((res) => {
                if (res && Array.isArray(res)) {
                    setWorks(res);
                } else {
                    setWorks([]);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [fin_kod]);

    const resetForm = () => {
        setDuty("");
        setWorkPlace("");
        setStartDate(undefined);
        setEndDate(undefined);
        setEditCode("");
        setEditMode(false);
    }

    const handleWorkCreate = async () => {
        try {
            setLoading(true);
            const experiencePayload: ExperiencePayload = {
                fin_kod: fin_kod || "",
                university: workPlace,
                title: duty,
                start_date: startDate ? startDate : 0,
                end_date: endDate
            }
            let result;
            result = await createExperience(experiencePayload);

            closeModal();
            setLoading(false);

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: editMode ? "Uğurla yeniləndi" : "Uğurla əlavə olundu",
                    text: editMode ? "İş yeri uğurla yeniləndi!" : "İş yeri uğurla əlavə edildi!"
                });
                resetForm();
                // Refresh works
                setLoading(true);
                getExperiences(fin_kod || "")
                    .then((res) => {
                        if (res && Array.isArray(res)) {
                            setWorks(res);
                        } else {
                            setWorks([]);
                        }
                    })
                    .finally(() => {
                        setLoading(false);
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

    const handleEdit = (work: Experience) => {
        setEditMode(true);
        setEditCode(work.exp_code);
        setWorkPlace(work.university);
        setDuty(work.title);
        setStartDate(work.start_date);
        setEndDate(work.end_date);
        openModal();
    }

    const handleDelete = (exp_code: string) => {
        Swal.fire({
            title: "Əminsiniz?",
            text: "Bu işi silmək istədiyinizə əminsiniz?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Bəli, sil!",
            cancelButtonText: "Ləğv et"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const res = await deleteExperience(exp_code);
                setLoading(false);
                if (res === "SUCCESS") {
                    Swal.fire("Silindi!", "İş yeri uğurla silindi.", "success");
                    // Refresh works
                    setLoading(true);
                    getExperiences(fin_kod || "")
                        .then((res) => {
                            if (res && Array.isArray(res)) {
                                setWorks(res);
                            } else {
                                setWorks([]);
                            }
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                } else {
                    Swal.fire("Xəta", "Silinmə zamanı xəta baş verdi", "error");
                }
            }
        });
    }

    console.log(editCode);

    const handleWorkEdit = async () => {
        try {
            setLoading(true);
            const experiencePayload: ExperiencePayload = {
                fin_kod: fin_kod || "",
                university: workPlace,
                title: duty,
                start_date: startDate ? startDate : 0,
                end_date: endDate
            };

            const result = await updateExperience(editCode, experiencePayload);
            setLoading(false);
            closeModal();

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Uğurla yeniləndi",
                    text: "İş yeri uğurla yeniləndi!"
                });
                resetForm();

                setLoading(true);
                getExperiences(fin_kod || "")
                    .then((res) => {
                        if (res && Array.isArray(res)) {
                            setWorks(res);
                        } else {
                            setWorks([]);
                        }
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else if (result === "NOT_FOUND") {
                Swal.fire({
                    icon: "error",
                    title: "Tapılmadı",
                    text: "İş yeri tapılmadı!"
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
                ) : works.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <div className="bg-yellow-200 text-yellow-800 w-[110px] flex justify-center items-center rounded-[20px] px-[5px]">Mövcud deyil</div>
                    </div>
                ) : (
                    works.map((work, index) => {
                        return (
                            <div
                                key={index}
                                className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-gray-800 dark:text-gray-100 font-medium">
                                        Enterprise: {work.university}
                                    </p>
                                    <p className="text-gray-800 dark:text-gray-100 font-medium">
                                        Job title: {work.title}
                                    </p>
                                    <p className="text-gray-800 dark:text-gray-100 font-medium">
                                        {work.start_date} - {work.end_date ? work.end_date : "present"}
                                    </p>
                                </div>
                                <div className="flex">
                                    <div
                                        className="bg-blue-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] mr-[10px] cursor-pointer"
                                        onClick={() => handleEdit(work)}
                                    >
                                        <EditIcon className="text-white" />
                                    </div>
                                    <div
                                        className="bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] cursor-pointer"
                                        onClick={() => handleDelete(work.exp_code)}
                                    >
                                        <DeleteIcon className="text-white" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
                <div className="flex justify-end items-end">
                    <Button onClick={() => { resetForm(); openModal(); }}>
                        Yeni iş yeri
                    </Button>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => { closeModal(); resetForm(); }}
                className="max-w-[700px] p-6 lg:p-10"
            >
                <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                    <div>
                        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                            {editMode ? "İşi redaktə et" : "Yeni iş yeri"}
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {editMode ? "İşi redaktə etmək üçün məlumatları dəyişdirib yadda saxlayın." : "Yeni iş yeri əlavə etmək üçün müəssisəni və vəzifəni daxil edib yadda saxlayın!"}
                        </p>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Müəssisə adı <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="event-title"
                                    type="text"
                                    value={workPlace}
                                    onChange={(e) => setWorkPlace(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Vəzifə <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="event-title"
                                    type="text"
                                    value={duty}
                                    onChange={(e) => setDuty(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Başlanğıc tarixi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="event-title"
                                    type="text"
                                    value={startDate}
                                    onChange={(e) => setStartDate(+e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Son tarixi (Son tarixi boş qoyaraq işin davam etidiyini bildirirsiz!)
                                </label>
                                <input
                                    id="event-title"
                                    type="text"
                                    value={endDate}
                                    onChange={(e) => setEndDate(+e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                        <button
                            onClick={() => { closeModal(); resetForm(); }}
                            type="button"
                            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                        >
                            Bağla
                        </button>
                        <Button
                            onClick={editMode ? handleWorkEdit : handleWorkCreate}
                            disabled={loading}
                            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                        >
                            {loading
                                ? (editMode ? "Yenilənir" : "Yadda saxlanılır")
                                : (editMode ? "Yadda saxla" : "Yadda saxla")}
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
