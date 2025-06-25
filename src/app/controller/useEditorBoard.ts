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
        setBoard((prev) => {
            const filterd_joiner = prev.joiner.filter((joiner) => joiner.applicant_id != applicant_id);
            const filterd_waiter = prev.waiter.filter((waiter) => waiter.applicant_id != applicant_id);
            
            if (filterd_joiner.length == 2) {
                return {
                    ...prev,
                    joiner: filterd_joiner.length == 2 ? [...filterd_joiner, filterd_waiter[0]] : filterd_joiner,
                    waiter: filterd_waiter.slice(1)
                }
            } else {
                return {
                    ...prev,
                    joiner: filterd_joiner,
                    waiter: filterd_waiter
                }
            }
        });
    };

    const onReplaceEvent = (applicant_id: ManageInstantType["applicant_id"], replace_id: ManageInstantType["applicant_id"]) => {
        setBoard((prev) => {
            const replace_applicant = prev.joiner.find((j) => j.applicant_id == replace_id) || prev.waiter.find((w) => w.applicant_id == replace_id);
            return replace_applicant ? {
                ...prev,
                joiner: prev.joiner.map((j) => j.applicant_id == applicant_id ? replace_applicant : j),
                waiter: prev.waiter.map((w) => w.applicant_id == applicant_id ? replace_applicant : w).filter((j) => j.applicant_id != replace_id)
            } : prev
        })
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
        onJoinEvent,
        onLeaveEvent,
        onReplaceEvent,
        onResetBoard
    }
}