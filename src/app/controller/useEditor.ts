"use client";
import { useEffect } from "react";

import useEditorConnectionController from "./useEditorConnection";
import useEditorApplicantController from "./useEditorApplicant";


export default function useEditorController() {
    const { connection_info, is_connect_socket, onConnectEvent, onDisconnectEvent } = useEditorConnectionController();
    const { 
        can_go_live, 
        liver_info, 
        applicants, 
        board, 
        onEmitEvent, 
        onLeaveEvent, 
        onReplaceEvent, 
        onUpdateQuestEvent, 
        onStartQuestEvent, 
        onResetEvent,
        postManagementEvent
    } = useEditorApplicantController();

    const connectionEvent = () => onConnectEvent(onEmitEvent);
    const disconnectionEvent = () => onDisconnectEvent(onResetEvent);

    useEffect(() => {
        console.log(board);
        if (connection_info.connection_id) {
            postManagementEvent(connection_info.connection_id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connection_info.connection_id, board])

    return {
        can_go_live,
        connection_info,
        is_connect_socket,
        liver_info,
        applicants,
        board,
        connectionEvent,
        disconnectionEvent,
        onLeaveEvent,
        onReplaceEvent,
        onUpdateQuestEvent,
        onStartQuestEvent,
    }
}