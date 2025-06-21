"useclient";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import { GetSettingResponseType } from "@/models/application/payload/get_setting/type";

export default function useSettingController() {
    const [settings, setSettings] = useState<GetSettingResponseType>({
        setting_id: "",
        keywords: []
    });

    useEffect(() => {
        getSettingsEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { fetchAPI } = useCallApi();

    const getSettingsEvent = async () => {
        await fetchAPI<undefined, GetSettingResponseType>(
            "/api/settings",
            "GET",
            undefined,
            undefined,
            { title: "ユーザー設定の取得に失敗しました" },
            (response) => {
                setSettings(response);
            }
        )
    }

    const addNewKeywordEvent = () => setSettings(
        {
            ...settings,
            keywords: [...settings.keywords, ""]
        }
    )

    const removeKeywordEvent = (index: number) => {
        const new_keywords = settings.keywords.filter((_, i) => i != index)
        setSettings({
            ...settings,
            keywords: new_keywords
        })
    }

    const updateKeyWordEvent = (index: number, value: string) => {
        setSettings({
            ...settings,
            keywords: settings.keywords.map((keyword, i) => i == index ? value : keyword)
        })
    }

    return { settings, addNewKeywordEvent, removeKeywordEvent, updateKeyWordEvent }
}