"use client";
import { useState, useEffect } from "react";
import { ManagementPayload } from "@/models/application/payload";
import { ManageInstantType } from "@/models/domain/embedded/managements/instant/type";

export default function useEditorBoardController() {
    const [board, setBoard] = useState<ManagementPayload.POSTRequestType>({
        joiner: [],
        waiter: [],
        quests: 0,
        applicants: 0,
    });

    useEffect(() => {
        console.log(board)
    }, [board])

    const onJoinEvent = (applicant: Omit<ManageInstantType, 'quest'>) => {
        setBoard((prev) => ({
            ...prev, 
            joiner: prev.joiner.length < 3  ? [...prev.joiner, {...applicant, quest: 0}] : [...prev.joiner],
            waiter: prev.joiner.length >= 3 ? [...prev.waiter, {...applicant, quest: 0}] : [...prev.waiter],
            applicants: prev.applicants++
        }))
    };

    const onLeaveEvent = (applicant_id: ManageInstantType["applicant_id"]) => {
        setBoard((prev) => ({
            ...prev,
            joiner: prev.joiner.filter((joiner) => joiner.applicant_id != applicant_id),
            waiter: prev.waiter.filter((waiter) => waiter.applicant_id != applicant_id)
        }))
    };


    const onResetBoard = async () => {
        setBoard({
            joiner: [],
            waiter: [],
            quests: 0,
            applicants: 0,
        });
    }

    return {
        board,
        onJoinEvent,
        onLeaveEvent,
        onResetBoard
    }
}