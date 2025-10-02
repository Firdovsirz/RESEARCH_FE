import apiClient from "../../util/apiClient";

export interface InterCorpPayload {
    fin_kod: string;
    inter_coor_name: string;
}

export interface InterCorp {
    inter_corp_name: string;
    inter_corp_code: string;
}

export const createInterCorp = async (interCorpPayload: InterCorpPayload, token: string) => {
    try {
        const response = await apiClient.post("/api/inter-corp/create", interCorpPayload, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.status_code === 201) {
            return "SUCCESS";
        }
    } catch (error: any) {
        if (error.response?.status === 404) {
            return "NOT_FOUND";
        }
        throw error;
    }
}

export const getInterCorpByFinCode = async (fin_kod: string, token: string) => {
    try {
        const response = await apiClient.get(`/api/inter-corp/${fin_kod}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.status_code === 200) {
            return response.data.inter_corps;
        } else if (response.data.status_code === 204) {
            return "NO CONTENT";
        }
    } catch (error: any) {
        if (error.response?.status === 404) {
            return "NOT_FOUND";
        }
        throw error;
    }
}