import apiClient from "../../util/apiClient";

export interface LanguagePaylaod {
    fin_kod: string;
    language_short_name: string;
    language_name: string;
    language_level: string;
}

export interface Language {
    id: number;
    language_short_name: string;
    language_name: string;
    language_level: string;
    lang_serial: string;
}

export const addLanguage = async (languagePayload: LanguagePaylaod, token: string) => {
    try {
        const response = await apiClient.post(
            "/api/language/create",
            languagePayload,
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
};

export const getLanguageByFinCode = async (fin_kod: string) => {
    try {
        const response = await apiClient.get(`/api/language/${fin_kod}`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
        });

        if (response.data.status_code === 200) {
            return response.data.languages;
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



export const deleteLanguage = async (lang_serial: string, token: string) => {
    try {
        const response = await apiClient.delete(`/api/language/${lang_serial}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.status_code === 200) {
            return "SUCCESS";
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return "NOT_FOUND";
        } else {
            console.error("Error deleting language:", error);
            return "ERROR";
        }
    }
};