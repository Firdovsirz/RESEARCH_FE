import apiClient from "../../util/apiClient";

export interface EducationPayload {
    fin_kod: string;
    title: string;
    university: string;
    start_date: number;
    end_date?: number
}

export interface Education {
    fin_kod: string;
    title: string;
    university: string;
    start_date: number;
    end_date?: number
    edu_code: string;
}

export const addEducation = async (educationPayload: EducationPayload) => {
    try {
        const response = await apiClient.post("/api/education/create", educationPayload);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }

    } catch (err: any) {
        return "ERROR"
    }
};

export const getEducations = async (fin_kod: string) => {
    try {
        const response = await apiClient.get(`/api/education/${fin_kod}?lang_code=az`);

        if (response.data.status_code === 200) {
            return response.data.educations;
        } else if (response.data.status_code === 204) {
            return "NO CONTENT";
        } else {
            return "ERROR";
        }
    } catch (err) {
        return "ERROR";
    }
}

export const updateEducation = async (edu_code: string, educationPayload: EducationPayload) => {
    try {
        const response = await apiClient.put(`/api/education/${edu_code}/update`, educationPayload);
        if (response.data.status_code === 200) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (err: any) {
        if (err.response.status === 404) {
            return "NOT_FOUND";
        }
        return "ERROR";
    }
};

export const deleteEducation = async (fin_kod: string, edu_code: string) => {
    try {
        const response = await apiClient.delete(`/api/education/${edu_code}/delete`);
        if (response.data.status_code === 200) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (err: any) {
        if (err.response.data.status_code === 404) {
            return "NOT_FOUND";
        }
        return "ERROR";
    }
};