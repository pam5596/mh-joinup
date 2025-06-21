"useclient";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import { GetSettingResponseType } from "@/models/application/payload/get_setting/type";

export default function useSettingController() {
    const [settings, setSettings] = useState<Partial<GetSettingResponseType>>({});

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

    return { settings, setSettings }
}