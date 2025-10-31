import apiClient from "../../util/apiClient";

export interface ResearchArea {
    fin_kod: string;
    area: string;
    area_code: string;
}

export interface AreaPayload {
    fin_kod: string;
    research_area: string;
}

export const addArea = async (areaPayload: AreaPayload) => {
    try {
        const response = await apiClient.post("/api/research-area/create", areaPayload);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (error: any) {
        if (error.response?.status === 404) {
            return "NOT_FOUND";
        }
        return "ERROR";
    }
};

export const getAreas = async (fin_kod: string) => {
    try {
        const response = await apiClient.get(`/api/research-area/${fin_kod}`);

        if (response.data.status_code === 200) {
            return response.data.areas;
        } else if (response.data.status_code === 204) {
            return "NO CONTENT";
        } else {
            return "ERROR";
        }
    } catch (err: any) {
        if (err.response?.status === 404) {
            return "NOT_FOUND";
        }
        return "ERROR";
    }
}

export const deleteArea = async (fin_kod: string, area_code: string) => {
    try {
        const response = await apiClient.delete(`/api/research-area/${fin_kod}/${area_code}/delete`);

        if (response.data.status_code === 200) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (error: any) {
        if (error.response?.status === 404) {
            return "NOT_FOUND";
        }
        return "ERROR";
    }
};

export const editArea = async (area_code: string, areaPayload: AreaPayload) => {
    try {
        const response = await apiClient.put(
            `/api/research-area/${area_code}/edit`,
            areaPayload
        );

        if (response.data.status_code === 200) {
            return "SUCCESS";
        } else if (response.data.status_code === 404) {
            return "NOT_FOUND";
        } else {
            return "ERROR";
        }
    } catch (error: any) {
        if (error.response?.status === 404) {
            return "NOT_FOUND";
        }
        return "ERROR";
    }
};