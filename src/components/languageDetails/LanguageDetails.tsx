import Swal from "sweetalert2";
import ISO6391 from 'iso-639-1';
import { Modal } from "../ui/modal";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useModal } from "../../hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';
import { addLanguage, getLanguageByFinCode, Language, LanguagePaylaod, deleteLanguage } from "../../services/language/languageService";

export default function LanguageDetails() {
    const [loading, setLoading] = useState(false);
    const [languageName, setLanguageName] = useState("");
    const { isOpen, openModal, closeModal } = useModal();
    const [interCorpName, setInterCorpName] = useState("");
    const [languages, setLanguages] = useState<Language[]>([]);
    const [languageShortName, setLanguageShortName] = useState("");
    const token = useSelector((state: RootState) => state.auth.token);
    const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);

    // language level logic

    const [selectedLanguageLevel, setSelecteLanguageLevel] = useState("");

    const languageLevelOptions = [
        {
            value: "A1",
            label: "A1"
        }, {
            value: "A2",
            label: "A2"
        }, {
            value: "B1",
            label: "B1"
        }, {
            value: "B2",
            label: "B2"
        }, {
            value: "C1",
            label: "C1"
        }, {
            value: "C2",
            label: "C2"
        }
    ];

    const handleLangLevelChange = async (value: string) => {
        setSelecteLanguageLevel(value);
    }

    useEffect(() => {
        setLoading(true);
        getLanguageByFinCode(fin_kod || "")
            .then((res) => {
                if (res && Array.isArray(res)) {
                    setLanguages(res);
                } else {
                    setLanguages([]);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [fin_kod]);

    const availableLanguages = ISO6391.getAllNames().map((name) => ({
        value: ISO6391.getCode(name),
        label: `${name} (${ISO6391.getCode(name)})`
    }));

    const handleLanguageChange = (value: string) => {
        setLanguageShortName(value);

        const selected = availableLanguages.find(opt => opt.value === value);
        if (selected) {
            const nameMatch = selected.label.match(/^(.+)\s\(/);
            setLanguageName(nameMatch ? nameMatch[1] : selected.label);
        } else {
            setLanguageName("");
        }
    };



    const handleInterCorpCreate = async () => {
        try {
            setLoading(true);
            const languagePayload: LanguagePaylaod = {
                fin_kod: fin_kod || "",
                language_short_name: languageShortName,
                language_level: selectedLanguageLevel,
                language_name: languageName
            }
            const result = await addLanguage(languagePayload, token || "");

            // Close the modal first
            closeModal();
            setLoading(false);

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Uğurla əlavə olundu",
                    text: "Dil uğurla əlavə edildi!"
                });
            } else if (result === "NOT_FOUND") {
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
    };

    const handleLangDelete = async (lang_serial: string) => {
        try {
            setLoading(true);
            const result = await deleteLanguage(lang_serial, token ? token : "");

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Language deleted successfully."
                });
                setLanguages(prev => prev.filter(lang => lang.lang_serial !== lang_serial));
            } else if (result === "NOT_FOUND") {
                Swal.fire({
                    icon: "error",
                    title: "Language not found."
                });
            } else if (result === "ERROR") {
                Swal.fire({
                    icon: "error",
                    title: "Unexpected error occured."
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Unexpected error occured."
            });
        } finally {
            setLoading(false);
        }
    }

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
                ) : languages.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <div className="bg-yellow-200 text-yellow-800 flex justify-center items-center rounded-[20px] px-[20px] py-[10px]">No language found.</div>
                    </div>
                ) : (
                    languages.map((language, index) => {
                        return (
                            <div
                                key={index}
                                className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-800 dark:text-gray-100 font-medium">
                                        {language.language_name} ({language.language_short_name}) - {language.language_level}
                                    </p>
                                    <div
                                        className="bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] cursor-pointer"
                                        onClick={() => handleLangDelete(language.lang_serial)}
                                    >
                                        <DeleteIcon className="text-white" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
                <div className="flex justify-end items-end">
                    <Button onClick={openModal}>
                        New language
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
                            Yeni language
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Select new language and its level and save details!
                        </p>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Language
                                </label>
                                <Select
                                    options={availableLanguages}
                                    onChange={(selectedOption) => handleLanguageChange(selectedOption)}
                                />
                            </div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Language level
                                </label>
                                <Select
                                    options={languageLevelOptions}
                                    onChange={handleLangLevelChange}
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
                            Close
                        </button>
                        <button
                            onClick={handleInterCorpCreate}
                            type="button"
                            disabled={loading}
                            className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
