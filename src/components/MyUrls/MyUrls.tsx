import Swal from "sweetalert2";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useModal } from "../../hooks/useModal";
import DeleteIcon from '@mui/icons-material/Delete';
import { createUrl, getUrls, Url, UrlPayload, updateUrl, deleteUrl } from "../../services/links/linkService";

export default function MyUrls() {
    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState<Url>();
    const [linkedin, setLinkedin] = useState("");
    const [scopusUrl, setScopusUrl] = useState("");
    const [scholarUrl, setScholarUrl] = useState("");
    const { isOpen, openModal, closeModal } = useModal();
    const [webOfScienceUrl, setWebOfScienceUrl] = useState("");
    const [editUrlId, setEditUrlId] = useState<string | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);
    const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);

    console.log(linkedin);


    const fetchUrls = () => {
        setLoading(true);
        getUrls(fin_kod || "")
            .then((res) => {
                if (res && typeof res === "object") {
                    setUrls(res);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUrls();
    }, [fin_kod]);

    const resetForm = () => {
        setScopusUrl("");
        setWebOfScienceUrl("");
        setScholarUrl("");
        setLinkedin("");
        setEditUrlId(null);
    };

    const handleCreateUrl = async () => {
        try {
            setLoading(true);

            // Build payload dynamically
            const urlPayload: UrlPayload = { fin_kod: fin_kod || "" };

            if (scopusUrl.trim()) urlPayload.scopus_url = scopusUrl.trim();
            if (webOfScienceUrl.trim()) urlPayload.webofscience_url = webOfScienceUrl.trim();
            if (scholarUrl.trim()) urlPayload.google_scholar_url = scholarUrl.trim();
            if (linkedin.trim()) urlPayload.linkedin_url = linkedin.trim();

            console.log(urlPayload);

            const result = await createUrl(urlPayload);

            closeModal();
            setLoading(false);

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Added",
                    text: "Url added successfully."
                }).then(() => {
                    resetForm();
                    fetchUrls();
                })
            } else if (result === "CONFLICT") {
                Swal.fire({
                    icon: "error",
                    title: "Existing url",
                    text: "Url exists."
                }).then(() => {
                    resetForm();
                })
            } else if (result === "VALIDATION_ERROR") {
                Swal.fire({
                    icon: "error",
                    title: "Wrong url",
                    text: "Provided urls should be valid."
                }).then(() => {
                    resetForm();
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unexpected error occured. Please try again later."
                }).then(() => {
                    resetForm();
                })
            }
        } catch (err) {
            closeModal();
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unexpected error occured. Please try again later.ı"
            });
        }
    }

    const handleUrlUpdate = async () => {
        if (!editUrlId) return;
        try {
            setLoading(true);
            const urlPayload: UrlPayload = {
                fin_kod: fin_kod || "",
                scopus_url: scopusUrl,
                webofscience_url: webOfScienceUrl,
                google_scholar_url: scholarUrl,
                linkedin_url: linkedin
            }
            const result = await updateUrl(editUrlId, urlPayload);

            closeModal();
            setLoading(false);
            resetForm();

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Updated",
                    text: "Url updated successfully"
                });
                fetchUrls();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unexpected error occured. Please try again later."
                });
            }
        } catch (err) {
            closeModal();
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unexpected error occured. Please try again later."
            });
        }
    }

    const handleUrlDelete = async (id: number, urlName: string) => {
        const confirmResult = await Swal.fire({
            title: 'Are you sure to delete?',
            text: "This action can not be recovered.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel'
        });

        if (confirmResult.isConfirmed) {
            try {
                setLoading(true);
                const result = await deleteUrl(id, urlName);
                setLoading(false);

                if (result === "SUCCESS") {
                    Swal.fire(
                        'Deleted!',
                        'Url deleted successfully.',
                        'success'
                    );
                    fetchUrls();
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
    }

    const handleEditClick = () => {
        if (!urls) return;
        setScopusUrl(urls.scopus_url || "");
        setWebOfScienceUrl(urls.web_of_science || "");
        setScholarUrl(urls.google_scholar || "");
        setLinkedin(urls.linkedin_url || "");
        setEditUrlId(fin_kod || null);
        openModal();
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
                ) : !urls?.scopus_url && !urls?.web_of_science && !urls?.google_scholar && !urls?.linkedin_url ? (
                    <div className="flex justify-center items-center">
                        <div className="bg-yellow-200 text-yellow-800 w-[110px] flex justify-center items-center rounded-[20px] px-[5px]">
                            No url found
                        </div>
                    </div>
                ) : (
                    <div>
                        {urls?.scopus_url ? (
                            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">

                                <p className="text-gray-800 dark:text-gray-100 font-medium">
                                    Scopus: <a className="italic" href={urls?.scopus_url}>{urls?.scopus_url}</a>
                                </p>
                                <div className="flex mt-2">
                                    <div
                                        className="bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] cursor-pointer"
                                        onClick={() => handleUrlDelete(urls?.id ? urls.id : 0, "scopus_url")}
                                    >
                                        <DeleteIcon className="text-white" />
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {urls?.web_of_science ? (
                            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
                                <p className="text-gray-800 dark:text-gray-100 font-medium">
                                    Web of Science: <a className="italic" href={urls?.web_of_science}>{urls?.web_of_science}</a>
                                </p>
                                <div className="flex mt-2">
                                    <div
                                        className="bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] cursor-pointer"
                                        onClick={() => handleUrlDelete(urls?.id ? urls.id : 0, "webofscience_url")}
                                    >
                                        <DeleteIcon className="text-white" />
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {urls?.google_scholar ? (
                            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
                                <p className="text-gray-800 dark:text-gray-100 font-medium">
                                    Google Scholar: <a className="italic" href={urls?.google_scholar}>{urls?.google_scholar}</a>
                                </p>
                                <div className="flex mt-2">
                                    <div
                                        className="bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] cursor-pointer"
                                        onClick={() => handleUrlDelete(urls?.id ? urls.id : 0, "google_scholar_url")}
                                    >
                                        <DeleteIcon className="text-white" />
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {urls?.linkedin_url ? (
                            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
                                <p className="text-gray-800 dark:text-gray-100 font-medium">
                                    Linkedin: <a className="italic" href={urls?.linkedin_url}>{urls?.linkedin_url}</a>
                                </p>
                                <div className="flex mt-2">
                                    <div
                                        className="bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] cursor-pointer"
                                        onClick={() => handleUrlDelete(urls?.id ? urls.id : 0, "linkedin_url")}
                                    >
                                        <DeleteIcon className="text-white" />
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                )
                }
                <div className="flex justify-end items-end">
                    {urls?.scopus_url || urls?.web_of_science || urls?.google_scholar || urls?.linkedin_url ? (
                        <Button onClick={handleEditClick} className="mr-[10px]">
                            Edit
                        </Button>
                    ) : null}
                    <Button onClick={() => { resetForm(); openModal(); }}>
                        New Url
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
                            New url
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            For adding new url provide available urls!
                        </p>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Scopus url
                                </label>
                                <input
                                    id="event-title"
                                    type="text"
                                    placeholder="https://scopus.com/"
                                    value={scopusUrl}
                                    onChange={(e) => setScopusUrl(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Web of Science url
                                </label>
                                <input
                                    id="event-title"
                                    type="text"
                                    placeholder="https://weofscience.com/"
                                    value={webOfScienceUrl}
                                    onChange={(e) => setWebOfScienceUrl(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Google Scholar url
                                </label>
                                <input
                                    id="event-title"
                                    type="text"
                                    placeholder="https://scholar.google.com/"
                                    value={scholarUrl}
                                    onChange={(e) => setScholarUrl(e.target.value)}
                                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    LinkedIn url
                                </label>
                                <input
                                    id="event-title"
                                    type="text"
                                    placeholder="https://linkedin.com/in/"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
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
                            Close
                        </button>
                        <button
                            onClick={editUrlId ? handleUrlUpdate : handleCreateUrl}
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
