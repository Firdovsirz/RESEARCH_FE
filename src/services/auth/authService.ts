import apiClient from "../../util/apiClient";

export interface SignUpPayload {
    name: string;
    surname: string;
    father_name: string;
    fin_kod: string;
    email: string;
    birth_date: string;
    password: string;
}

export interface VerifySignUpPayload {
    name: string;
    surname: string;
    father_name: string;
    fin_kod: string;
    email: string;
    birth_date: string;
    password: string;
}

export interface Credentials {
    fin_kod: string;
    password: string;
}

export const signup = async (signUpPayload: SignUpPayload) => {
    try {
        const response = await apiClient.post("/auth/signup", signUpPayload);

        if (response.data.status_code === 200) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (e: any) {
        if (e.response?.status === 409) {
            return "CONFLICT";
        } else {
            return "ERROR";
        }
    }
}

export const verifySignUp = async (verifySignUpPayload: VerifySignUpPayload) => {
    try {
        const response = await apiClient.post("/auth/signup/verify", verifySignUpPayload);

        if (response.data.status_code === 201) {
            return "SUCCESS";
        } else {
            return "ERROR";
        }
    } catch (e: any) {
        if (e.response?.status === 401) {
            return "UNAUTHORIZED";
        } else {
            return "ERROR";
        }
    }
}

export const signin = async (credentials: Credentials) => {
    try {
        const response = await apiClient.post("/auth/signin", credentials);

        if (response.data.status_code === 200) {
            return response.data.data;
        } else {
            return "UNAUTHORIZED";
        }
    } catch (err: any) {
        if (err.response?.status === 401) {
            return "UNAUTHORIZED";
        }
        return "ERROR";
    };
};