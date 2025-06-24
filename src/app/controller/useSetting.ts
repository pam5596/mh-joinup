"use client";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import { SettingsPayload } from "@/models/application/payload";

export default function useSettingController() {
    const [settings, setSettings] = useState<SettingsPayload.GETResponseType>({
        setting_id: "",
        keywords: []
    });
    const [prev_settings, setPrevSettings] = useState<SettingsPayload.GETResponseType>({
        setting_id: "",
        keywords: []
    });

    useEffect(() => {
        getSettingsEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setPrevSettings(settings)
        if (
            prev_settings.setting_id.length && 
            JSON.stringify(settings) != JSON.stringify(prev_settings)
        ) {
            if (
                !settings.keywords.some((v)=>v=="")
            ) {
                updateSettingsEvent()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings.keywords])

    const { fetchAPI } = useCallApi();

    const getSettingsEvent = async () => {
        await fetchAPI<undefined, SettingsPayload.GETResponseType>(
            "/api/settings",
            "GET",
            undefined,
            undefined,
            "ユーザー設定の取得に失敗しました",
            (response) => {
                setSettings(response);
            }
        )
    }

    const updateSettingsEvent = async () => {
        await fetchAPI<SettingsPayload.GETResponseType, unknown>(
            "/api/settings",
            "PUT",
            settings,
            "ユーザ設定を更新しました。",
            "ユーザ設定の更新に失敗しました。"
        )
    }

    const addNewKeywordEvent = () => setSettings(
        (prev) => ({
            ...prev,
            keywords: [...prev.keywords, ""]
        })
    )

    const removeKeywordEvent = (index: number) => {
        setSettings((prev) => ({
            ...prev,
            keywords: prev.keywords.filter((_, i) => i != index)
        }))
    }

    const updateKeyWordEvent = (index: number, value: string) => {
        setSettings((prev) => ({
            ...prev,
            keywords: prev.keywords.map((keyword, i) => i == index ? value : keyword)
        }));
    }

    return { settings, updateSettingsEvent, addNewKeywordEvent, removeKeywordEvent, updateKeyWordEvent }
}