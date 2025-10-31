import Swal from "sweetalert2";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useModal } from "../../hooks/useModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addArea, AreaPayload, getAreas, ResearchArea, editArea, deleteArea } from "../../services/reasearchArea/researchAreaService";

export default function ResearchAreas() {
    const [area, setArea] = useState("");
    const [loading, setLoading] = useState(false);
    const [areas, setAreas] = useState<ResearchArea[]>([]);
    const { isOpen, openModal, closeModal } = useModal();
    const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
    const token = useSelector((state: RootState) => state.auth.token);
    const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);
    const [selectedArea, setSelectedArea] = useState<ResearchArea | null>(null);

    useEffect(() => {
        setLoading(true);
        getAreas(fin_kod || "")
            .then((res) => {
                if (res && Array.isArray(res)) {
                    setAreas(res);
                } else {
                    setAreas([]);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [fin_kod]);

    const refreshAreas = () => {
        setLoading(true);
        getAreas(fin_kod || "")
            .then((res) => {
                if (res && Array.isArray(res)) {
                    setAreas(res);
                } else {
                    setAreas([]);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleWorkCreate = async () => {
        try {
            setLoading(true);
            const areaPayload: AreaPayload = {
                fin_kod: fin_kod || "",
                research_area: area
            }
            const result = await addArea(areaPayload);

            closeModal();
            setArea("");
            setLoading(false);

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Uğurla əlavə olundu",
                    text: "Research Area added successfully!"
                });
                refreshAreas();
            } else if (result === "NOT_FOUND") {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "Fin code is not valid."
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "Server error"
                });
            }
        } catch (err) {
            closeModal();
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Xəta",
                text: "Server error"
            });
        }
    }

    const handleEditClick = (areaToEdit: ResearchArea) => {
        setSelectedArea(areaToEdit);
        setArea(areaToEdit.area);
        openEditModal();
    };
    console.log(selectedArea);
    console.log(area);

    const handleEditSave = async () => {
        if (!selectedArea) return;
        try {
            setLoading(true);
            const areaPayload: AreaPayload = {
                fin_kod: selectedArea.fin_kod,
                research_area: area
            }
            const result = await editArea(selectedArea.area_code, areaPayload);

            closeEditModal();
            setArea("");
            setSelectedArea(null);
            setLoading(false);

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Uğurla yeniləndi",
                    text: "Research Area updated successfully!"
                });
                refreshAreas();
            } else if (result === "NOT_FOUND") {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "Fin code is not valid."
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Xəta",
                    text: "Server error"
                });
            }
        } catch (err) {
            closeEditModal();
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Xəta",
                text: "Server error"
            });
        }
    };

    const handleDeleteClick = (fin_kod: string, area_code: string, area: string) => {
        Swal.fire({
            title: 'Silmək istədiyinizə əminsiniz?',
            text: `“${area}” ixtisas sahəsi silinəcək!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Bəli, sil',
            cancelButtonText: 'İmtina'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const res = await deleteArea(fin_kod, area_code);
                    setLoading(false);
                    if (res === "SUCCESS") {
                        Swal.fire(
                            'Silindi!',
                            'İxtisas sahəsi uğurla silindi.',
                            'success'
                        );
                        refreshAreas();
                    } else {
                        Swal.fire(
                            'Xəta',
                            'Silinmə zamanı xəta baş verdi.',
                            'error'
                        );
                    }
                } catch {
                    setLoading(false);
                    Swal.fire(
                        'Xəta',
                        'Silinmə zamanı xəta baş verdi.',
                        'error'
                    );
                }
            }
        });
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
                ) : areas.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <div className="bg-yellow-200 text-yellow-800 w-[110px] flex justify-center items-center rounded-[20px] px-[5px]">Mövcud deyil</div>
                    </div>
                ) : (
                    areas.map((areaItem, index) => {
                        return (
                            <div
                                key={index}
                                className="flex justify-between items-center border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <p className="text-gray-800 dark:text-gray-100 font-medium">
                                    {areaItem.area}
                                </p>
                                <div className="flex">
                                    <div
                                        className="bg-blue-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] mr-[10px] cursor-pointer"
                                        onClick={() => handleEditClick(areaItem)}
                                    >
                                        <EditIcon className="text-white" />
                                    </div>
                                    <div
                                        className="bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] cursor-pointer"
                                        onClick={() => handleDeleteClick(areaItem.fin_kod, areaItem.area_code, areaItem.area)}
                                    >
                                        <DeleteIcon className="text-white" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
                <div className="flex justify-end items-end">
                    <Button onClick={() => { setArea(""); openModal(); }}>
                        Yeni ixtisas sahəsi
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
                            Yeni iş yeri
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Yeni ixtisas sahəsi əlavə etmək üçün sahə adını daxil edib yadda saxlayın!
                        </p>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    İxtisas sahəsi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="event-title"
                                    type="text"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
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

            <Modal
                isOpen={isEditOpen}
                onClose={() => { closeEditModal(); setSelectedArea(null); setArea(""); }}
                className="max-w-[700px] p-6 lg:p-10"
            >
                <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
                    <div>
                        <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                            İxtisas sahəsini redaktə et
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            İxtisas sahəsinin adını dəyişmək üçün sahəni redaktə edib yadda saxlayın!
                        </p>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    İxtisas sahəsi <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="edit-event-title"
                                    type="text"
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
                        <button
                            onClick={() => { closeEditModal(); setSelectedArea(null); setArea(""); }}
                            type="button"
                            className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                        >
                            Bağla
                        </button>
                        <button
                            onClick={handleEditSave}
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
