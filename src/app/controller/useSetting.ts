"use client";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import { SettingsPayload } from "@/models/application/payload";

export default function useSettingController() {
    const [settings, setSettings] = useState<SettingsPayload.GETResponseType>();

    useEffect(() => {
        getSettingsEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (settings) {
            if (settings.setting_id && !settings.keywords.some((k) => k == '')) {
                updateSettingsEvent()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings])

    const { fetchAPI } = useCallApi();

    const getSettingsEvent = async () => {
        await fetchAPI<undefined, SettingsPayload.GETResponseType>(
            "/api/settings",
            "GET",
            undefined,
            undefined,
            "ユーザー設定の取得に失敗しました。",
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
            undefined,
            "ユーザ設定の更新に失敗しました。"
        )
    }

    const addNewKeywordEvent = () => setSettings(
        (prev) => prev ? ({
            ...prev,
            keywords: [...prev.keywords, ""]
        }) : prev
    );

    const removeKeywordEvent = (index: number) => {
        setSettings((prev) => prev ? ({
            ...prev,
            keywords: prev.keywords.filter((_, i) => i != index)
        }) : prev);
    }

    const updateKeyWordEvent = (index: number, value: string) => {
        setSettings((prev) => prev ? ({
            ...prev,
            keywords: prev.keywords.map((keyword, i) => i == index ? value : keyword)
        }) : prev);
    }

    const updateQuestEvent = (value: number) => setSettings(
        (prev) => prev ? ({
            ...prev,
            quest: value
        }) : prev
    );

    return { 
        settings, 
        updateSettingsEvent, 
        addNewKeywordEvent, 
        removeKeywordEvent, 
        updateKeyWordEvent,
        updateQuestEvent
    }
}