"use client";
import { useState, useEffect } from "react";


export default function useEditorBoardController() {
    const [board, setBoard] = useState({
        joiner: [],
        waiter: [],
        quests: 0,
        applicants: 0,
    });

    useEffect(() => {
        console.log(board)
    }, [board])

    // const onJoin = async () => {
    //     if (board.joiner.length <= 3) {
    //         setBoard((prev) => ({...prev, joiner: [...prev.joiner, ]}))
    //     }
    // }


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