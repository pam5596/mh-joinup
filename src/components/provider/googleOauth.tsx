"use client";
import { useEffect } from "react";
import { useCallApi } from "@/hooks"
import { redirect } from "next/navigation";

export default function GoogleOauth({ children }: { children: React.ReactNode }) {
    const { fetchAPI } = useCallApi();

    useEffect(() => {
        const fetchData = async () => {
            await fetchAPI(
                '/api/google-oauth',
                'GET',
                undefined,
                {
                    title: '正常にログインしました',
                    description: 'GoogleOAuthの認証が成功しました。',
                },
                undefined,
                undefined,
                () => {
                    redirect('/')
                }
            );
        };
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {children}
        </>
    )
}