import apiClient from "../../util/apiClient";

export const getScopusByFinKod = async (finKod: string, token: string) => {
    try {
        const response = await apiClient.get(`/api/scopus/profile/${finKod}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.data.status_code === 200) {
            return response.data.scopus_url;
        } else {
            return "ERROR";
        }
    } catch (error: any) {
        if (error.response.status === 404) {
            return "NOT FOUND";
        }
        return "ERROR";
    }
}