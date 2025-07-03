"use client";

import { io, Socket } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { useCallApi } from "@/hooks";
import { ManagementPayload, BrowserSourcePayload } from "@/models/application/payload";

export default function useBrowserSourceController() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [socketClient, _] = useState<Socket>(
        io(`${process.env.NEXT_PUBLIC_SOCKET_API_DOMAIN}/board_management`, {
            path: "/socket.io/mhjoinup",
            autoConnect: false,
            forceNew: true
        })
    );
    const [liver_info, setLiverInfo] = useState<BrowserSourcePayload.GETResponseType>();
    const [board, setBoard] = useState<ManagementPayload.PUTResponseType>();
    const searchParams = useSearchParams();

    const { fetchAPI } = useCallApi();

    useEffect(() => {
        const hashed_user_id = searchParams.get('hash');
        const channel_id = searchParams.get('channel');

        if (hashed_user_id && channel_id) {
            getLiverInfoEvent(channel_id, hashed_user_id)
        }
        return () => {
            if (socketClient.connected) socketClient.disconnect();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const getLiverInfoEvent = async (
        channel_id: string,
        hashed_user_id: string
    ) => {
        await fetchAPI<BrowserSourcePayload.GETRequestType, BrowserSourcePayload.GETResponseType>(
            `/api/browser-source?channel_id=${channel_id}`,
            'GET',
            undefined,
            undefined,
            'ユーザのチャンネル情報の取得に失敗しました',
            (response) => {
                setLiverInfo(response);
                socketClient.connect();
                socketClient.on(
                    hashed_user_id,
                    (emit_data) => {
                        setBoard(emit_data)
                    }
                )
            }
        )
    }



    const containerRef = useRef<HTMLDivElement>(null);
    const scrollInfo = {step: 1, interval: 30, waittime: 5000};

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scroll = () => {
            container.scrollTop += scrollInfo.step;

            if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
                container.scrollTop = 0;
                setTimeout(scroll, scrollInfo.waittime)
            } else {
                setTimeout(scroll, scrollInfo.interval);
            }
        };

        const initialTimeout = setTimeout(scroll, scrollInfo.waittime);
        return () => {
            clearTimeout(initialTimeout);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        containerRef,
        board,
        liver_info
    }
}