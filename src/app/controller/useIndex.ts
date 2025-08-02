"use client";
import { useEffect } from "react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useCallApi, useAlertSnack } from "@/hooks";

export default function useIndexController() {
    const { fetchAPI } = useCallApi();
    const { openSnack } = useAlertSnack();

    useEffect(() => {
        logoutEvent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const logoutEvent = async () => {
        await fetchAPI(
            '/api/google-oauth',
            'DELETE',
            undefined,
            '正常にログアウトしました',
            'ログアウトに失敗しました',
        )
    }


    const loginEvent = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/calendar.readonly',
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