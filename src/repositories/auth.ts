import type {LoginResponse} from "../model/ApiResponse/loginResponse.ts";
import type ApiResponse from "../model/ApiResponse/ApiResponse.ts";

export const auth = async (credentials: { username: string; password: string }):Promise<ApiResponse<LoginResponse>> => {
    const res = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}login`,
        {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }

        });
    return await res.json();
}

export const getRoles = (): string[] => {
    //TODO
    return ['ROLE_USER'];
}