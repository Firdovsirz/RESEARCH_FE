import apiClient from "../../util/apiClient";

const lang_code = "az";

export interface UserPayload {
    fin_kod: string;
    scientific_degree_name: string;
    scientific_name: string;
    bio: string;
    scopus_url: string;
}

export interface UserProfile {
    name: string;
    surname: string;
    father_name: string;
    email: string;
    birth_date: string;
    fin_kod: string;
    scopus: string;
    scientific_degree_name: string;
    scientific_name: string;
    bio: string;
    created_at: string;
}

export const createUserProfile = async (userPayload: UserPayload, token: string) => {
    try {
        const response = await apiClient.post("/api/user/create", userPayload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status_code === 201) {
            return "SUCCESS";
        }
    } catch (error: any) {
        if (error.response?.status === 404) {
            return "NOT_FOUND";
        } else if (error.response?.status === 409) {
            return "CONFLICT";
        }
        return "ERROR";
    }
}

export const getUserProfile = async (fin_kod: string, token: string) => {
    try {
        const response = await apiClient.get(`/api/user/${fin_kod}/profile?lang=${lang_code}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status_code === 200) {
            return response.data.user;
        }
    } catch (error: any) {
        if (error.response?.status === 404) {
            return "NOT_FOUND";
        }
        return "ERROR";
    }
}

export const getAllUsers = async (start?: number, end?: number) => {
    try {
        const response = await apiClient.get(`/api/user/all?start=${start}&end=${end}&lang=${lang_code}`);

        if (response.data.status_code === 200) {
            return {
                "users": response.data.users,
                "total": response.data.total
            }
        } else if (response.status === 204) {
            return "NO CONTENT";
        } else {
            return "ERROR";
        }
    } catch (err) {
        return "ERROR"
    }
}