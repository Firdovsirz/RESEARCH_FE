import Swal from "sweetalert2";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useModal } from "../../hooks/useModal";
import { createUrl, getUrls, Url, UrlPayload } from "../../services/links/linkService";

export default function MyUrls() {
    const [duty, setDuty] = useState("");
    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState<Url[]>([]);
    const [scopusUrl, setScopusUrl] = useState("");
    const [workPlace, setWorkPlace] = useState("");
    const [scholarUrl, setScholarUrl] = useState("");
    const { isOpen, openModal, closeModal } = useModal();
    const [webOfScienceUrl, setWebOfScienceUrl] = useState("");
    const token = useSelector((state: RootState) => state.auth.token);
    const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);

    useEffect(() => {
        setLoading(true);
        getUrls(fin_kod || "")
            .then((res) => {
                if (res && typeof res === "object") {
                    setUrls(res)
                } else {
                    setUrls([]);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [fin_kod]);

    const handleCreateUrl = async () => {
        try {
            setLoading(true);
            const urlPayload: UrlPayload = {
                fin_kod: fin_kod || "",
                scopus_url: scopusUrl,
                webofscience_url: webOfScienceUrl,
                google_scholar_url: scholarUrl
            }
            const result = await createUrl(urlPayload);

            closeModal();
            setLoading(false);

            if (result === "SUCCESS") {
                Swal.fire({
                    icon: "success",
                    title: "Uğurla əlavə olundu",
                    text: "İş yeri uğurla əlavə edildi!"
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
    console.log(urls);
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
                ) : urls.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <div className="bg-yellow-200 text-yellow-800 w-[110px] flex justify-center items-center rounded-[20px] px-[5px]">Mövcud deyil</div>
                    </div>
                ) : (
                    urls.map((url, index) => {
                        return (
                            <div
                                key={index}
                                className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                            >
                               {url.scopus_url ? (
                                 <p className="text-gray-800 dark:text-gray-100 font-medium">
                                    Scopus: <a className="italic" href={url.scopus_url}>{url.scopus_url}</a>
                                </p>
                               ) : null}
                                {url.web_of_science ? (
                                    <p className="text-gray-800 dark:text-gray-100 font-medium">
                                    Web of Science: <a className="italic" href={url.web_of_science}>{url.web_of_science}</a>
                                </p>
                                ) : null}
                                {url.google_scholar ? (
                                    <p className="text-gray-800 dark:text-gray-100 font-medium">
                                    Google Scholar: <a className="italic" href={url.google_scholar}>{url.google_scholar}</a>
                                </p>
                                ) : null}
                            </div>
                        )
                    })
                )}
                <div className="flex justify-end items-end">
                    <Button onClick={openModal}>
                        Yeni iş yeri
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
                            Yeni iş yeri əlavə etmək üçün müəssisəni və vəzifəni daxil edib yadda saxlayın!
                        </p>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div className="mb-[20px]">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Scopus linki
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
                                    Web of Science linki
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
                                    Google Scholar linki
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
                            onClick={handleCreateUrl}
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
