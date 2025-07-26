import {BusinessCode} from "@/shared/constants/businessCode";
import type Election from "../model/Election/Election.ts";
import type ApiResponse from "../model/ApiResponse/ApiResponse.ts";

const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_API_PATH}`;

export const getAllElections = async (): Promise<ApiResponse<Election[]> | null> => {
    const res = await fetch(`${apiUrl}elections`)
    if (res.status === 500) {
        return {code: BusinessCode.FAILED, message: 'ERROR.SERVER_ERROR', body: []}
    }
    return await res.json();
}
export const getElection = async (electionId: number):Promise<ApiResponse<Election | null>> => {
    const res = await fetch(`${apiUrl}elections/${electionId}`);
    if (res.status === 500) {
        return {code: BusinessCode.FAILED, message: 'ERROR.SERVER_ERROR', body: null}
    }
    const response = await res.json();
    return await response;
}