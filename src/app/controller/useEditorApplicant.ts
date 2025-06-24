"use client";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import useEditorBoardController from "./useEditorBoard";
import { ConnectionPayload, SettingsPayload, ApplicantPayload, GoogleOauthPayload } from "@/models/application/payload";

export default function useEditorApplicantController() {
    const { board, onResetBoard } = useEditorBoardController();
    
    const [liver_info, setLiverInfo] = useState<GoogleOauthPayload.GETResponseType>();
    const [user_settings, setUserSettings] = useState<Partial<SettingsPayload.GETResponseType>>({});

    const [applicants, setApplicants] = useState<ApplicantPayload.POSTResponseType["applicants"]>([]);

    const { fetchAPI } = useCallApi();

    useEffect(()=>{
        getUserSettingsEvent();
        getLiverInfoEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getLiverInfoEvent = async () => {
        await fetchAPI<undefined, GoogleOauthPayload.GETResponseType>(
            "/api/google-oauth",
            "GET",
            undefined,
            undefined,
            { title: "ライバー情報の取得に失敗しました" },
            (response) => {
                setLiverInfo(response);
            }
        )
    }

    const getUserSettingsEvent = async () => {
        await fetchAPI<undefined, SettingsPayload.GETResponseType>(
            "/api/settings",
            "GET",
            undefined,
            undefined,
            { title: "ユーザー設定の取得に失敗しました" },
            (response) => {
                setUserSettings(response);
            }
        )
    }

    const postApplicantEvent = async (request: ApplicantPayload.POSTRequestType) => {
        await fetchAPI<ApplicantPayload.POSTRequestType, ApplicantPayload.POSTResponseType>(
            "/api/applicant",
            "POST",
            request,
            { title: "参加希望を確認しました" },
            undefined,
            (response) => {
                setApplicants([...applicants, ...response.applicants]);
            }
        )
    }

    const onEmitEvent = async(
        emit_data: ApplicantPayload.POSTRequestType,
        connection_response: ConnectionPayload.GETResponseType
    ) => {
        const applicant_messages = {
            ...emit_data,
            connectionId: connection_response.connection_id,
            chatMessages: emit_data.chatMessages.filter(
                (chatMessage) => user_settings.keywords!.some(
                    (keyword) => chatMessage.displayMessage.includes(keyword)
                )
            )
        };
        console.log(applicant_messages);

        await postApplicantEvent(applicant_messages);
    }
            

    const onResetEvent = async () => {
        setApplicants([]);
        onResetBoard()
    }

    return { liver_info, applicants, board, onEmitEvent, onResetEvent }
}