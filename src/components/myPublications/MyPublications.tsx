import Swal from "sweetalert2";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useModal } from "../../hooks/useModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Publication, PublicationPayload, createPublication, getPublicationByFinCode, updatePublication, deletePublication } from "../../services/publication/publicationService";

export default function MyPublications() {
  const [loading, setLoading] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const [publicationUrl, setPublicationUrl] = useState("");
  const [publicationName, setPublicationName] = useState("");
  const [publications, setPublications] = useState<Publication[]>([]);
  const [editPublicationId, setEditPublicationId] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);
  const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);

  useEffect(() => {
    setLoading(true);
    getPublicationByFinCode(fin_kod || "")
      .then((res) => {
        if (res && Array.isArray(res)) {
          setPublications(res);
        } else {
          setPublications([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fin_kod]);

  const refreshPublications = () => {
    setLoading(true);
    getPublicationByFinCode(fin_kod || "")
      .then((res) => {
        if (res && Array.isArray(res)) {
          setPublications(res);
        } else {
          setPublications([]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePublicationCreate = async () => {
    try {
      setLoading(true);
      const publicationPayload: PublicationPayload = {
        fin_kod: fin_kod || "",
        publication_name: publicationName,
        publication_url: publicationUrl
      }
      const result = await createPublication(publicationPayload, token || "");

      // Close the modal first
      closeModal();
      setLoading(false);

      if (result === "SUCCESS") {
        Swal.fire({
          icon: "success",
          title: "Uğurla əlavə olundu",
          text: "Məqalə sahəsi uğurla əlavə edildi!"
        });
        refreshPublications();
        setPublicationName("");
        setPublicationUrl("");
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
  }

  const handlePublicationUpdate = async () => {
    if (!editPublicationId) return;
    try {
      setLoading(true);
      const publicationPayload: PublicationPayload = {
        fin_kod: fin_kod || "",
        publication_name: publicationName,
        publication_url: publicationUrl
      }
      const result = await updatePublication(editPublicationId, publicationPayload, token || "");

      closeModal();
      setLoading(false);
      setEditPublicationId(null);

      if (result === "SUCCESS") {
        Swal.fire({
          icon: "success",
          title: "Uğurla yeniləndi",
          text: "Məqalə sahəsi uğurla yeniləndi!"
        });
        refreshPublications();
        setPublicationName("");
        setPublicationUrl("");
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
      setEditPublicationId(null);
      Swal.fire({
        icon: "error",
        title: "Xəta",
        text: "Server xətası"
      });
    }
  }

  const handlePublicationDelete = async (publication_code: string) => {
    const confirmResult = await Swal.fire({
      icon: "warning",
      title: "Təsdiqlə",
      text: "Bu nəşri silmək istədiyinizə əminsiniz?",
      showCancelButton: true,
      confirmButtonText: "Bəli, sil",
      cancelButtonText: "Ləğv et"
    });

    if (confirmResult.isConfirmed) {
      try {
        setLoading(true);
        const result = await deletePublication(publication_code, token || "");
        setLoading(false);

        if (result === "SUCCESS") {
          Swal.fire({
            icon: "success",
            title: "Uğurla silindi",
            text: "Məqalə sahəsi uğurla silindi!"
          });
          refreshPublications();
        } else {
          Swal.fire({
            icon: "error",
            title: "Xəta",
            text: "Silinmə zamanı xəta baş verdi"
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
  }

  const handleEditClick = (publication: Publication) => {
    setEditPublicationId(publication.publication_code);
    setPublicationName(publication.publication_name);
    setPublicationUrl(publication.publication_url);
    openModal();
  }

  const handleModalClose = () => {
    closeModal();
    setEditPublicationId(null);
    setPublicationName("");
    setPublicationUrl("");
  }

  console.log(publications);
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
        ) : publications.length === 0 ? (
          <div className="flex justify-center items-center">
            <div className="bg-yellow-200 text-yellow-800 w-[110px] flex justify-center items-center rounded-[20px] px-[5px]">Mövcud deyil</div>
          </div>
        ) : (
          publications.map((publication, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <a href={`${publication.publication_url}`} target="_blank" rel="noopener noreferrer">
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {publication.publication_name}
                  </p>
                </a>
                <div className="flex mt-2">
                  <div
                    className="bg-blue-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] mr-[10px] cursor-pointer"
                    onClick={() => handleEditClick(publication)}
                  >
                    <EditIcon className="text-white" />
                  </div>
                  <div
                    className="bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] cursor-pointer"
                    onClick={() => handlePublicationDelete(publication.publication_code)}
                  >
                    <DeleteIcon className="text-white" />
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div className="flex justify-end items-end">
          <Button onClick={() => {
            setEditPublicationId(null);
            setPublicationName("");
            setPublicationUrl("");
            openModal();
          }}>
            Yeni nəşr
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <div>
            <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
              {editPublicationId ? "Nəşri redaktə et" : "Yeni nəşr"}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {editPublicationId ? "Nəşr məlumatlarını redaktə edin." : "Yeni nəşr yaratmaq üçün nəşr adını və əgər mövcuddursa link daxil edin!"}
            </p>
          </div>
          <div className="mt-8">
            <div>
              <div className="mb-[20px]">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nəşr adı
                </label>
                <input
                  id="event-title"
                  type="text"
                  value={publicationName}
                  onChange={(e) => setPublicationName(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nəşr linki (mövcuddursa)
                </label>
                <input
                  id="event-title"
                  type="text"
                  value={publicationUrl}
                  onChange={(e) => setPublicationUrl(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
            <button
              onClick={handleModalClose}
              type="button"
              className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Bağla
            </button>
            <button
              onClick={editPublicationId ? handlePublicationUpdate : handlePublicationCreate}
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
