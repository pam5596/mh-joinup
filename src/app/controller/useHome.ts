"useclient";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import { GetUserResponseType } from "@/models/application/payload/get_user/type";

export default function useHomeController() {
    const [userInfo, setUserInfo] = useState<Partial<GetUserResponseType>>({});

    useEffect(() => {
        getUserInfoEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { fetchAPI } = useCallApi();

    const getUserInfoEvent = async () => {
        await fetchAPI<undefined, GetUserResponseType>(
            "/api/google-oauth",
            "GET",
            undefined,
            undefined,
            { title: "ユーザー情報の取得に失敗しました" },
            (response) => {
                setUserInfo(response);
            }
        )
    }

    return { userInfo }
}