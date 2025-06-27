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
    } = useEditorApplicantController();

    const connectionEvent = () => onConnectEvent(onEmitEvent);
    const disconnectionEvent = () => onDisconnectEvent(onResetEvent);

    useEffect(() => {
        if (connection_info.connection_id) {
            console.log(board);
            postManagementEvent(connection_info.connection_id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        connection_info.connection_id, 
        board.quests, 
        board.applicants, 
        board.joiner.length, 
        board.waiter.length
    ])

    return {
        can_go_live,
        connection_info,
        is_connect_socket,
        liver_info,
        applicants,
        board,
        management_status,
        connectionEvent,
        disconnectionEvent,
        onLeaveEvent,
        onReplaceEvent,
        onUpdateQuestEvent,
        onStartQuestEvent,
        undoBoardEvent,
        rollBackBoardEvent
    }
}