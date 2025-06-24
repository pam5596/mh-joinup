"use client";
import { io, Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import { ConnectionPayload, SettingsPayload, ApplicantPayload } from "@/models/application/payload";

export default function useEditorController() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [socketClient, _] = useState<Socket>(
        io(`${process.env.NEXT_PUBLIC_SOCKET_API_DOMAIN}/castcraft_webhook`, {
            path: "/socket.io/mhjoinup"
        })
    );
    const [is_connect_socket, setIsConnect] = useState(false);
    const [user_settings, setUserSettings] = useState<Partial<SettingsPayload.GETResponseType>>({})
    const [connection_info, setConnectInfo] = useState<Partial<ConnectionPayload.GETResponseType>>({});
    const [applicants, setApplicants] = useState<ApplicantPayload.POSTResponseType["applicants"]>([]);

    const { fetchAPI } = useCallApi();

    useEffect(()=>{
        getUserSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getUserSettings = async () => {
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
                setApplicants([...applicants, ...response.applicants])
            }
        )
    }

    const connectionEvent = async () => {
        await fetchAPI(
            "/api/connection",
            "GET",
            undefined,
            undefined,
            { title: "ユーザー情報の取得に失敗しました" },
            (response: ConnectionPayload.GETResponseType) => {
                setConnectInfo(response);
                setIsConnect(true);

                socketClient.on(response.youtube_id, async(emit_data: ApplicantPayload.POSTRequestType) => {
                    const applicant_messages = {
                        ...emit_data,
                        connectionId: response.connection_id,
                        chatMessages: emit_data.chatMessages.filter(
                            (chatMessage) => user_settings.keywords!.some(
                                (keyword) => chatMessage.displayMessage.includes(keyword)
                            )
                        )
                    };
                    console.log(applicant_messages);

                    await postApplicantEvent(applicant_messages);
                });
            }
        );
    }

    const disconnectionEvent = async () => {
        socketClient.disconnect();
        setIsConnect(false);
        setConnectInfo({})
    }

    return { connection_info, is_connect_socket, applicants, connectionEvent, disconnectionEvent }
}