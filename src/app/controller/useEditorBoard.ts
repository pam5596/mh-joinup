"use client";
import { useState } from "react";
// import { ApplicantPayload } from "@/models/application/payload";


export default function useEditorBoardController() {
    const [board, setBoard] = useState({
        joiner: [],
        waiter: [],
        quests: 0,
        applicants: 0,
    });


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
        onResetBoard
    }
}