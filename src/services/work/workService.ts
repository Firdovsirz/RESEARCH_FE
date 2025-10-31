import apiClient from "../../util/apiClient";

const lang_code = "az";

export interface WorkPayload {
    fin_kod: string;
    work_place: string;
    duty: string;
};

export interface ExperiencePayload {
    fin_kod: string;
    title: string;
    university: string;
    start_date: number;
    end_date?: number
};

export interface Experience {
    fin_kod: string;
    start_date: number;
    end_date: number;
    title: string;
    university: string;
    exp_code: string;
};
    
export const addWork = async (workPayload: WorkPayload, token: string) => {
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

export const createExperience = async (experiencePayload: ExperiencePayload) => {
    try {
        const response = await apiClient.post("/api/experience/create", experiencePayload);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (error: any) {
        return "ERROR";
    }
}

export const getExperiences = async (fin_kod: string) => {
    try {
        const response = await apiClient.get(`/api/experience/${fin_kod}`);

        if (response.data.status_code === 200) {
            return response.data.experiences;
        } else if (response.data.status_code === 204) {
            return "NO CONTENT";
        } else {
            return "ERROR";
        }
    } catch (error: any) {
            return "ERROR";
    }
}

export const updateExperience = async (exp_code: string, experiencePayload: ExperiencePayload) => {
    try {
        const response = await apiClient.put(`/api/experience/${exp_code}/update`, experiencePayload);

        if (response.data.status_code === 200) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return "NOT_FOUND";
        } else {
            return "ERROR";
        }
    }
}

export const deleteExperience = async (id: string) => {
    try {
        const response = await apiClient.delete(`/api/experience/${id}/delete`);

        if (response.data.status_code === 200) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return "NOT_FOUND";
        } else {
            return "ERROR";
        }
    }
}