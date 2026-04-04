import apiClient from "../../util/apiClient";

export interface ScientificNamePayload {
    fin_kod: string;
    scientific_code: number;
    scientific_name: string;
}

export const addScientificName = async (scientificNamePayload: ScientificNamePayload) => {
    try {
        const response = await apiClient.post(
            "/api/scientific_name/create",
            scientificNamePayload
        );

        if (response.data.status_code === 201) {
            return "SUCCESS";
        }
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 409) {
                return "CONFLICT";
            } else if (error.response.status === 404) {
                return "NOT_FOUND";
            }
        }
        return "ERROR";
    }
};

// export const addScientificDegree = async () => {
//     try {
//         const response = await apiClient.post("/api/scientific_degree/create")
//     }
// }