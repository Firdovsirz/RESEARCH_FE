import apiClient from "../../util/apiClient";

const lang_code = "az";

export interface WorkPayload {
    fin_kod: string;
    work_place: string;
    duty: string;
}

export interface Work {
    work_place: string;
    duty: string;
}

export const addWork = async (workPayload:  WorkPayload, token: string) => {
    try {
        const response = await apiClient.post(
            "/api/work/create",
            workPayload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.data.status_code === 201) {
            return "SUCCESS";
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return "NOT_FOUND";
        } else {
            console.error("Error adding language:", error);
            return "ERROR";
        }
    }
}

export const getWorkByFinCode = async (fin_kod: string) => {
    try {
        const response = await apiClient.get(`/api/work/${fin_kod}?lang=${lang_code}`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
        });

        if (response.data.status_code === 200) {
            return response.data.works;
        } else if (response.data.status_code === 204) {
            return "NO CONTENT";
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return "NOT_FOUND";
        } else {
            console.error("Error fetching language:", error);
            return "ERROR";
        }
    }
};