import apiClient from "../../util/apiClient";

export interface PublicationPayload {
    fin_kod: string;
    publication_name: string;
    publication_url?: string;
}

export interface Publication {
    fin_kod: string;
    publication_url: string;
    publication_code: string;
    publication_name: string;
}

export const getPublicationByFinCode = async (fin_kod: string) => {
    try {
        const response = await apiClient.get(`/api/publication/${fin_kod}`);

        if (response.data.status_code === 200) {
            return response.data.publications;
        } else if (response.status === 204) {
            return "NO CONTENT";
        } else {
            return "ERROR";
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return "NOT FOUND";
        } else {
            return "ERROR";
        }
    }
}

export const createPublication = async (publicationPayload: PublicationPayload) => {
    try {
        const response = await apiClient.post("/api/publication/create", publicationPayload);

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

export const deletePublication = async (publicationCode: string) => {
    try {
        const response = await apiClient.delete(`/api/publication/${publicationCode}/delete`);

        if (response.status === 200) {
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
};

export const updatePublication = async (publicationCode: string, publicationPayload: PublicationPayload) => {
    try {
        const response = await apiClient.put(`/api/publication/${publicationCode}/update`, publicationPayload);

        if (response.status === 200) {
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