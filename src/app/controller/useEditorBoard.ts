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

    const onJoin = (applicant: Omit<ManageInstantType, 'quest'>) => {
        setBoard((prev) => ({
            ...prev, 
            joiner: prev.joiner.length < 3  ? [...prev.joiner, {...applicant, quest: 0}] : [...prev.joiner],
            waiter: prev.joiner.length >= 3 ? [...prev.waiter, {...applicant, quest: 0}] : [...prev.waiter],
            applicants: prev.applicants++
        }))
    }


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
        onJoin,
        onResetBoard
    }
}