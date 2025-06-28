"use client";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import { GoogleOauthPayload, BrowserSourcePayload } from "@/models/application/payload";

export default function useHomeController() {
    const [userInfo, setUserInfo] = useState<Partial<GoogleOauthPayload.GETResponseType>>({});

    useEffect(() => {
        getUserInfoEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { fetchAPI } = useCallApi();

    const getUserInfoEvent = async () => {
        await fetchAPI<undefined, GoogleOauthPayload.GETResponseType>(
            "/api/google-oauth",
            "GET",
            undefined,
            undefined,
            "ユーザー情報の取得に失敗しました。",
            (response) => {
                setUserInfo(response);
            }
        )
    }

    const getBrowserSourceEvent = async () => {
        await fetchAPI<undefined, BrowserSourcePayload.POSTResponseType>(
            "/api/browser-source",
            "POST",
            undefined,
            'ブラウザソースをクリップボードにコピーしました。',
            'ブラウザソースの取得に失敗しました。',
            async (response) => {
                await navigator.clipboard.writeText(response.url);
            }
        )
    }

    return { userInfo, getBrowserSourceEvent }
}