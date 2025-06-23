"use client";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

export default function useEditorController() {
    const [connectionInfo, setConnectInfo] = useState({});

    useEffect(()=>{
        getConnectionInfoEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const { fetchAPI } = useCallApi();

    const getConnectionInfoEvent = async () => {
        await fetchAPI(
            "/api/connection",
            "GET",
            undefined,
            undefined,
            { title: "ユーザー情報の取得に失敗しました" },
            (response) => {
                console.log(response)
            }
        )
    }
}