import apiClient from "../../util/apiClient";

export interface UrlPayload {
    fin_kod: string;
    scopus_url?: string;
    webofscience_url?: string;
    google_scholar_url?: string;
    linkedin_url?: string;
}

export interface Url {
    id: number;
    fin_kod: string;
    scopus_url: string;
    web_of_science: string;
    google_scholar: string;
    linkedin_url: string;
}

export const getUrls = async (fin_kod: string) => {
    try {
        const response = await apiClient.get(`/api/link/${fin_kod}`);

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
        const response = await apiClient.post("/api/link/create", urlPayload);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (error: any) {
        if (error.response && error.response.status === 422) {
            return "VALIDATION_ERROR";
        } else if (error.response && error.response.status === 409) {
            return "CONFLICT";
        } else {
            return "ERROR";
        }
    }
}

export const updateUrl = async (urlId: string, urlPayload: UrlPayload) => {
    try {
        const response = await apiClient.put(`/api/link/${urlId}/update`, urlPayload);
        if (response.data.status_code === 200) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return "NOT_FOUND";
        } else if (error.response && error.response.status === 409) {
            return "CONFLICT";
        } else {
            return "ERROR";
        }
    }
}

export const deleteUrl = async (urlId: number, url_name: string) => {
    try {
        const response = await apiClient.delete(`/api/link/${urlId}/delete/${url_name}`);
        if (response.data.status_code === 200) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return "NOT_FOUND";
        } else if (error.response && error.response.status === 409) {
            return "CONFLICT";
        } else {
            return "ERROR";
        }
    }
}