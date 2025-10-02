import apiClient from "../../util/apiClient";

const lang_code = "az";

export interface ArticlePayload {
    fin_kod: string;
    article_field: string;
}

export interface Article {
    article_field: string;
}

export const getArticleByFinKod = async (finKod: string) => {
    try {
        const response = await apiClient.get(`/api/article/fin/${finKod}?lang=${lang_code}`);

        if (response.data.status_code === 200) {
            return response.data.articles;
        } else if (response.status === 204) {
            return "NO CONTENT";
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return "NOT FOUND";
        }
        return "ERROR";
    }
};

export const createArticle = async (aritclePayload: ArticlePayload, token: string) => {
    try {
        const response = await apiClient.post("/api/article/create", aritclePayload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status_code === 201) {
            return "SUCCESS";
        }
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 404) {
                return "NOT_FOUND";
            }
            if (error.response.status === 409) {
                return "CONFLICT";
            }
        }
        return "ERROR";
    }
};