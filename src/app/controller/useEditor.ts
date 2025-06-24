"use client";

import useEditorConnectionController from "./useEditorConnection";
import useEditorApplicantController from "./useEditorApplicant";


export default function useEditorController() {
    const { connection_info, is_connect_socket, onConnectEvent, onDisconnectEvent } = useEditorConnectionController();
    const { liver_info, applicants, board, onEmitEvent, onResetEvent } = useEditorApplicantController();

    const connectionEvent = () => onConnectEvent(onEmitEvent);
    const disconnectionEvent = () => onDisconnectEvent(onResetEvent);

    return {
        connection_info,
        is_connect_socket,
        liver_info,
        applicants,
        board,
        connectionEvent,
        disconnectionEvent
    }
}