"use client";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import useEditorBoardController from "./useEditorBoard";
import { ConnectionPayload, SettingsPayload, ApplicantPayload, GoogleOauthPayload } from "@/models/application/payload";

export default function useEditorApplicantController() {
    const { board, onJoinEvent, onLeaveEvent, onReplaceEvent, onUpdateQuestEvent, onStartQuestEvent, onResetBoard } = useEditorBoardController();
    
    const [liver_info, setLiverInfo] = useState<GoogleOauthPayload.GETResponseType>();
    const [user_settings, setUserSettings] = useState<Partial<SettingsPayload.GETResponseType>>({});

    const [applicants, setApplicants] = useState<ApplicantPayload.POSTResponseType["applicants"]>([]);

    const { fetchAPI } = useCallApi();

    useEffect(()=>{
        getUserSettingsEvent();
        getLiverInfoEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // useEffect(()=>{
    //     console.log(applicants)
    // }, [applicants])

    const getLiverInfoEvent = async () => {
        await fetchAPI<undefined, GoogleOauthPayload.GETResponseType>(
            "/api/google-oauth",
            "GET",
            undefined,
            undefined,
            "ライバー情報の取得に失敗しました。",
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
            "ユーザー設定の取得に失敗しました。",
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
            "参加希望を確認しました。",
            undefined,
            (response) => {
                setApplicants(prevApplicants => [...prevApplicants, ...response.applicants]);
                response.applicants.forEach((applicant) => onJoinEvent(applicant));
            }
        )
    }

    const onEmitEvent = async (
        emit_data: ApplicantPayload.POSTRequestType,
        connection_response: ConnectionPayload.GETResponseType
    ) => {
        const applicant_messages = {
            ...emit_data,
            connection_id: connection_response.connection_id,
            chat_data: emit_data.chat_data.filter(
                (chatData) => user_settings.keywords!.some(
                    (keyword) => chatData.message.includes(keyword)
                ) && !board.joiner.some(
                    (j) => j.avatar == chatData.avatar
                ) && !board.waiter.some(
                    (w) => w.avatar == chatData.avatar
                )
            )
        };

        if (applicant_messages.chat_data.length) {
            await postApplicantEvent(applicant_messages);
        }
    }


    const onResetEvent = async () => {
        setApplicants([]);
        onResetBoard()
    }

    return { liver_info, applicants, board, onEmitEvent, onLeaveEvent, onReplaceEvent, onUpdateQuestEvent, onStartQuestEvent, onResetEvent }
}