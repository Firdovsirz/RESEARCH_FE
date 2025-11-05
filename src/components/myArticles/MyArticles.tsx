import Swal from "sweetalert2";
import Label from "../form/Label";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useModal } from "../../hooks/useModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Article, createArticle, getArticleByFinKod, updateArticle, deleteArticle } from "../../services/article/articleService";

export default function MyArticles() {
  const [newField, setNewField] = useState("");
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [editArticleId, setEditArticleId] = useState<string | null>(null);

  const { isOpen, openModal, closeModal } = useModal();
  const token = useSelector((state: RootState) => state.auth.token);
  const fin_kod = useSelector((state: RootState) => state.auth.fin_kod);

  const fetchArticles = () => {
    setLoading(true);
    getArticleByFinKod(fin_kod || "")
      .then((res) => setArticles(Array.isArray(res) ? res : []))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchArticles();
  }, [fin_kod]);

  const handleArticleCreateOrUpdate = async () => {
    if (newField.length === 0) {
      closeModal();
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Article name should be filled!"
      });
      return;
    }
    try {
      setLoading(true);

      let result;
      result = await createArticle({ fin_kod: fin_kod || "", article_field: newField }, token || "");

      closeModal();
      setLoading(false);
      setNewField("");
      setEditArticleId(null);
      fetchArticles();

      if (result === "SUCCESS") {
        Swal.fire({
          icon: "success",
          title: editArticleId ? "Updated successfully" : "Added successfully",
          text: editArticleId ? "Article edited successfully!" : "Article added successfully!"
        });
      } else if (result === "NOT_FOUND") {
        Swal.fire({ icon: "error", title: "Error", text: "User not found!" });
      } else {
        Swal.fire({ icon: "error", title: "Error", text: "Unexpected error. Please try again later." });
      }
    } catch (err) {
      closeModal();
      setLoading(false);
      Swal.fire({ icon: "error", title: "Error", text: "Unexpected error. Please try again later." });
    }
  }

  const handleArticleUpdate = async () => {
    try {
      if (!editArticleId) return;
      setLoading(true);

      const result = await updateArticle(editArticleId, { fin_kod: fin_kod || "", article_field: newField }, token || "");

      closeModal();
      setLoading(false);
      setNewField("");
      setEditArticleId(null);
      fetchArticles();

      if (result === "SUCCESS") {
        Swal.fire({
          icon: "success",
          title: "Successfully updated1",
          text: "Article updated successfully!"
        });
      } else if (result === "NOT_FOUND") {
        Swal.fire({ icon: "error", title: "Error", text: "User not found!" });
      } else if (result === "CONFLICT") {
        Swal.fire({ icon: "error", title: "Error", text: "Article already exists!" });
      } else {
        Swal.fire({ icon: "error", title: "Error", text: "Unexpected error. Please try again later." });
      }
    } catch (err) {
      closeModal();
      setLoading(false);
      Swal.fire({ icon: "error", title: "Error", text: "Unexpected error. Please try again later." });
    }
  }

  const handleEditClick = (article: Article) => {
    setEditArticleId(article.article_code);
    setNewField(article.article_field);
    openModal();
  }

  const handleDeleteClick = async (articleId: string) => {
    const confirmed = await Swal.fire({
      icon: "warning",
      title: "Are you sure to delete?",
      text: "This action can not be recovered.",
      showCancelButton: true,
      confirmButtonText: "Bəli",
      cancelButtonText: "Xeyr"
    });

    if (confirmed.isConfirmed) {
      setLoading(true);
      const result = await deleteArticle(articleId, token || "");
      setLoading(false);
      fetchArticles();

      if (result === "SUCCESS") {
        Swal.fire({ icon: "success", title: "Deleted successfully.", text: "Article deleted successfully!" });
      } else {
        Swal.fire({ icon: "error", title: "Error", text: "Unexpected error. Please try again later." });
      }
    }
  }

  return (
    <>
      <div>
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm animate-pulse">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))
        ) : articles.length === 0 ? (
          <div className="flex justify-center items-center">
            <div className="bg-yellow-200 text-yellow-800 w-[110px] flex justify-center items-center rounded-[20px] px-[5px]">No articles found</div>
          </div>
        ) : (
          articles.map((article) => (
            <div key={article.article_code} className="flex justify-between items-center border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-gray-800 dark:text-gray-100 font-medium">{article.article_field}</p>
              <div className="flex mt-2">
                <div
                  className="bg-blue-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] mr-[10px] cursor-pointer"
                  onClick={() => handleEditClick(article)}
                >
                  <EditIcon className="text-white" />
                </div>
                <div
                  className="bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[10px] cursor-pointer"
                  onClick={() => handleDeleteClick(article.article_code)}
                >
                  <DeleteIcon className="text-white" />
                </div>
              </div>
            </div>
          ))
        )}
        <div className="flex justify-end items-end mt-4">
          <Button onClick={() => { setEditArticleId(null); setNewField(""); openModal(); }}>
            New article
          </Button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
        <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
          <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
            {editArticleId ? "Update article" : "New article"}
          </h5>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {editArticleId ? "Update existing article" : "For adding new article fill article name and save!"}
          </p>
          <Label>Article</Label>
          <input
            type="text"
            value={newField}
            placeholder="Article name"
            onChange={(e) => setNewField(e.target.value)}
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
          <div className="flex items-center gap-3 mt-6 sm:justify-end">
            <button onClick={closeModal} className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
              Close
            </button>
            <button
              onClick={editArticleId ? handleArticleUpdate : handleArticleCreateOrUpdate}
              disabled={loading}
              className="btn btn-success flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              {loading ? "Yadda saxlanılır" : editArticleId ? "Dəyişdir" : "Yadda saxla"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}