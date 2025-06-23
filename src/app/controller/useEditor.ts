"use client";
import { io, Socket } from "socket.io-client";
import { useState } from "react";
import { useCallApi } from "@/hooks";

import { ConnectionPayload } from "@/models/application/payload";

export default function useEditorController() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [socketClient, _] = useState<Socket>(
        io(`${process.env.NEXT_PUBLIC_SOCKET_API_DOMAIN}/castcraft_webhook`, {
            path: "/socket.io/mhjoinup"
        })
    );
    const [is_connect_socket, setIsConnect] = useState(false);
    const [connection_info, setConnectInfo] = useState<Partial<ConnectionPayload.GETResponseType>>({});

    const { fetchAPI } = useCallApi();

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

                socketClient.on(response.youtube_id, (emit_data) => {
                    console.log(emit_data);
                });
            }
        );
    }

    const disconnectionEvent = async () => {
        socketClient.disconnect();
        setIsConnect(false);
        setConnectInfo({})
    }

    return { connection_info, connectionEvent, is_connect_socket, disconnectionEvent }
}