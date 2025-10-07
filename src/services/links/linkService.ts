import apiClient from "../../util/apiClient";

export interface UrlPayload {
    fin_kod: string;
    scopus_url?: string;
    webofscience_url?: string;
    google_scholar_url?: string;
}

export interface Url {
    fin_kod: string;
    scopus_url: string;
    web_of_science: string;
    google_scholar: string;
}

export const getUrls = async (fin_kod: string) => {
    try {
        const response = await apiClient.get(`/api/links/profile/${fin_kod}`);

        if (response.data.status_code === 200) {
            return response.data.data;
        } else {
            return "ERROR";
        }
    } catch (err) {
        return "ERROR";
    }
}

export const createUrl = async (urlPayload: UrlPayload) => {
    try {
        const response = await apiClient.post("/api/links-create", urlPayload);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        }
    } catch (err) {
        return "ERROR";
    }
}