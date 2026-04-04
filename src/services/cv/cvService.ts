import apiClient from "../../util/apiClient";

export interface CvPayload {
  fin_kod: string;
  cv: File;
}

export const addCv = async (payload: CvPayload | FormData) => {
  try {
    let data: FormData;
    if (payload instanceof FormData) {
      data = payload;
    } else {
      data = new FormData();
      data.append("fin_kod", payload.fin_kod);
      data.append("cv", payload.cv);
    }

    const response = await apiClient.post("/api/cv/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.status_code === 201) return "SUCCESS";
  } catch (error: any) {
    if (error.response && error.response.status === 404) return "NOT FOUND";
    return "ERROR";
  }
};

export const getCvByFinCode = async (fin_kod: string) => {
    try {
        const response = await apiClient.get(`/api/cv/${fin_kod}`);

        if (response.data.status_code === 200) {
            return response.data.cv_path;
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.error("CV not found (404)");
            return "NOT FOUND";
        } else {
            return "ERROR";
        }
    }
}

export const deleteCv = async (fin_kod: string) => {
    try {
        const response = await apiClient.delete(`/api/cv/${fin_kod}/delete`);

        if (response.data.status_code === 200) {
            return "SUCCESS";
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return "NOT_FOUND";
        } else {
            console.error("Error deleting CV:", error);
            return "ERROR";
        }
    }
};