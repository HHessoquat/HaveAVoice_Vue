import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {auth} from "../repositories/auth.ts";

const token =  ref<string | null>(localStorage.getItem('token'))
const expires_in = ref<Date | null>(localStorage.getItem('expires_in') ?
    new Date(JSON.parse(localStorage.getItem('expires_in')!))
    : null
);
const now = ref<Date>(new Date());
console.log(new Date(JSON.parse(localStorage.getItem('expires_in')!)));
console.log(new Date())
console.log(!!token.value
    && !!expires_in.value
    && expires_in.value > new Date())

export function useAuth() {
    const router = useRouter();

    const isAuthenticated = computed(() => !!token.value
        && !!expires_in.value
        && expires_in.value > now.value
    );
    const user = computed(() => parseJwt().sub)

    function refreshIsAuthenticated() {
        now.value = new Date();
    }

    async function login(username: string, password:string) {
        const response = await auth({username, password});
        if (response.code === "200") {
            setToken(response.body)
        }
        return response.code;
    }

    function setToken(response: {token: string, expires: Date}) {
        token.value = response.token;
        localStorage.setItem('token', response.token);
        expires_in.value = response.expires;
        localStorage.setItem('expires_in', JSON.stringify(response.expires));
    }

    async function logout() {
        clearAuth();
        await router.push('/');
    }
    function clearAuth() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_in');
        token.value = null;
        expires_in.value = null;
    }

    function parseJwt() {
        const payloadBase64 = `${token.value}`.split('.')[1];
        const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(payloadJson);
    }
    function getUserId() {
        if(!token.value) {
            return null;
        }
        return parseJwt().userId;
    }

    return {
        isAuthenticated,
        login,
        logout,
        user,
        token,
        getUserId,
        refreshIsAuthenticated,
    }
}