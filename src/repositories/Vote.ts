import {useAuth} from "../composables/useAuth.ts";
import type VoteWriteDto from "../model/Vote/VoteWriteDto.ts";
import type ApiResponse from "../model/ApiResponse/ApiResponse.ts";
import type Vote from "../model/Vote/Vote.ts";
import {BusinessCode} from "../shared/constants/BusinessCode.ts";

const url = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_API_PATH}`
const auth = useAuth();

export async function addVote(vote: VoteWriteDto): Promise<ApiResponse<Vote | null>> {
    const data = await fetch(`${url}votes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${auth.token.value}`,
        },
        body: JSON.stringify(vote)
    });
    if (data.status === 500) {
        return {code: BusinessCode.FAILED, message: 'ERROR.SERVER_ERROR', body: null}
    }
    return data.json();
}