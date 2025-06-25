"use client";
import { io, Socket } from "socket.io-client";
import { useState } from "react";
import { useCallApi } from "@/hooks";

import { ConnectionPayload, ApplicantPayload } from "@/models/application/payload";

export default function useEditorConnectionController() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [socketClient, _] = useState<Socket>(
        io(`${process.env.NEXT_PUBLIC_SOCKET_API_DOMAIN}/castcraft_webhook`, {
            path: "/socket.io/mhjoinup",
            autoConnect: false
        })
    );
    const [is_connect_socket, setIsConnect] = useState(false);
    const [connection_info, setConnectInfo] = useState<Partial<ConnectionPayload.GETResponseType>>({});

    const { fetchAPI } = useCallApi();

    const onConnectEvent = async (
        onEmitEvent: (
            emit_data: ApplicantPayload.POSTRequestType, 
            connection_response: ConnectionPayload.GETResponseType
        ) => void
    ) => {
        socketClient.connect()
        await fetchAPI(
            "/api/connection",
            "GET",
            undefined,
            undefined,
            "ライブ配信情報の取得に失敗しました。" ,
            async (response: ConnectionPayload.GETResponseType) => {
                setConnectInfo(response);
                setIsConnect(true);
                socketClient.on(
                    response.youtube_id, 
                    (emit_data: ApplicantPayload.POSTRequestType) => onEmitEvent(emit_data, response)
                );
            }
        );
    }

    const onDisconnectEvent = async (
        onDisconnectEvent: () => void
    ) => {
        socketClient.disconnect();
        setIsConnect(false);
        setConnectInfo({});
        onDisconnectEvent();
    }

    return { connection_info, is_connect_socket, onConnectEvent, onDisconnectEvent }
}