"use client";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import useEditorBoardController from "./useEditorBoard";
import { ConnectionPayload, SettingsPayload, ApplicantPayload, GoogleOauthPayload } from "@/models/application/payload";

export default function useEditorApplicantController() {
    const { 
        board, 
        management_status,
        onJoinEvent, 
        onLeaveEvent, 
        onReplaceEvent, 
        onUpdateQuestEvent, 
        onStartQuestEvent, 
        onResetBoard, 
        postManagementEvent,
        undoBoardEvent,
        rollBackBoardEvent
    } = useEditorBoardController();
    
    const [can_go_live, setCanGoLive] = useState({get_liver_info: false, get_user_setting: false}) 
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
            "ライバー情報の取得に失敗しました。",
            (response) => {
                setLiverInfo(response);
                setCanGoLive((prev) => ({...prev, get_liver_info: true}));
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
                setCanGoLive((prev) => ({...prev, get_user_setting: true}));
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

    return { 
        can_go_live, 
        liver_info, 
        applicants, 
        board, 
        management_status,
        onEmitEvent, 
        onLeaveEvent, 
        onReplaceEvent, 
        onUpdateQuestEvent, 
        onStartQuestEvent, 
        onResetEvent,
        postManagementEvent,
        undoBoardEvent,
        rollBackBoardEvent
    }
}