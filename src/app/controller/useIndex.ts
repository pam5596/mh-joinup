"use client";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useCallApi, useAlertSnack } from "@/hooks";

export default function useIndexController() {
    const { fetchAPI } = useCallApi();
    const { openSnack } = useAlertSnack();

    const loginEvent = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            await fetchAPI<TokenResponse, { next_path: string }>(
                "/api/google-oauth",
                "POST",
                tokenResponse,
                undefined,
                "ログインに失敗しました。",
                (response) => {
                    location.href = response.next_path;
                }
            );
        },
        onError: () => {
            openSnack(
                "ログインに失敗しました。",
                "Googleアカウントを作成するか、しばらく時間を置いてから再度お試しください。",
                "error"
            )
        },
    });


    return {
        loginEvent,
    }
}