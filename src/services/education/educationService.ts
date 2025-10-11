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
        const response = await apiClient.get(`/api/education/${fin_kod}`);

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