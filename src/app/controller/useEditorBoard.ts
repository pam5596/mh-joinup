"use client";
import { useEffect, useState } from "react";

import { useCallApi } from "@/hooks";
import { ManagementPayload } from "@/models/application/payload";
import { ManageInstantType } from "@/models/domain/embedded/managements/instant/type";

export default function useEditorBoardController() {
    const [board, setBoard] = useState<Omit<ManagementPayload.POSTRequestType, 'connection_id'>>({
        joiner: [],
        waiter: [],
        quests: 0,
        applicants: 0,
    });
    const [managements, setManagements] = useState<(ManagementPayload.POSTRequestType)[]>([])
    const [stash_boards, setStashBoards] = useState<Omit<ManagementPayload.POSTRequestType, 'connection_id'>[]>([])
    const [management_status, setManagementStatus] = useState({is_managements: false, is_stash_boards: false})

    const { fetchAPI } = useCallApi();

    useEffect(() => {
        setManagementStatus({
            is_managements: managements.length > 2,
            is_stash_boards: Boolean(stash_boards.length)
        });
    },[managements, stash_boards])


    // const getManagementsEvent = async (connection_id: string) => {
    //     await fetchAPI<ManagementPayload.GETRequestType, ManagementPayload.GETResponseType>(
    //         `/api/management?connection_id=${connection_id}`,
    //         'GET',
    //         undefined,
    //         undefined,
    //         "参加状況の復元に失敗しました",
    //         (response) => {
    //             console.log(response)
    //             setManagements(
    //                 (prev) => [...prev, ...response.managements]
    //             );
    //             setBoard(
    //                 () => response.managements.reverse()
    //             )
    //         }
    //     )
    // }


    const postManagementEvent = async (connection_id: string) => {
        setManagements(
            (prev) => [...prev, {...board, connection_id}]
        );
        await fetchAPI<ManagementPayload.POSTRequestType, ManagementPayload.POSTResponseType>(
            "/api/management",
            'POST',
            { ...board, connection_id },
            "参加状況を保存しました。",
            "参加状況の保存に失敗しました。",
            undefined,
            undefined
        )
    };


    // [FIXIT] 正しく元に戻すとやり直しができていないので修正が必要
    const undoBoardEvent = () => {
        const before_management = managements.at(-2 - stash_boards.length);

        if (before_management) {
            setStashBoards((prev) => [...prev, board])
            setBoard(() => ({
                connection_id: before_management.connection_id,
                joiner: before_management.joiner,
                waiter: before_management.waiter,
                quests: before_management.quests,
                applicants: before_management.applicants
            }))
        }
    }

    const rollBackBoardEvent = () => {
        if (stash_boards.length) {
            setBoard((prev) => stash_boards.at(-1) || prev)
            setStashBoards((prev) => prev.slice(0, -1))
        }
    }


    const onJoinEvent = (
        applicant: Omit<ManageInstantType, 'quest'>,
        setting_quest: number
    ) => {
        setBoard((prev) => {
            if (prev.joiner.length < 3) {
                return ({
                    ...prev, 
                    joiner: [...prev.joiner, {...applicant, quest: 0}],
                    applicants: prev.applicants+1
                })
            } else {
                const insert_row_index_joiner = prev.joiner[prev.waiter.length % 3];
                let insert_applicant_quest: number;

                if (insert_row_index_joiner.quest < setting_quest) {
                    insert_applicant_quest = setting_quest * Math.ceil((prev.waiter.length + 1) / 3) - insert_row_index_joiner.quest;
                } else {
                    insert_applicant_quest = setting_quest * Math.ceil((prev.waiter.length + 1) / 3) - setting_quest
                }

                return ({
                    ...prev, 
                    waiter: [...prev.waiter, {...applicant, quest: insert_applicant_quest }],
                    applicants: prev.applicants+1
                })
            }
        })
    };

    const onLeaveEvent = (applicant_id: ManageInstantType["applicant_id"]) => {
        setBoard((prev) => {
            const filterd_joiner = prev.joiner.filter((joiner) => joiner.applicant_id != applicant_id);
            const filterd_waiter = prev.waiter.filter((waiter) => waiter.applicant_id != applicant_id);
            
            if (filterd_joiner.length == 2) {
                return {
                    ...prev,
                    joiner: filterd_joiner.length == 2 ? [...filterd_joiner, {... filterd_waiter[0], quest: 0}] : filterd_joiner,
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

    const onUpdateQuestEvent = (applicant_id: ManageInstantType["applicant_id"], quest: ManageInstantType['quest']) => {
        setBoard((prev) => ({
            ...prev,
            joiner: prev.joiner.map((j) => j.applicant_id == applicant_id ? { ...j, quest } : j),
            waiter: prev.waiter.map((w) => w.applicant_id == applicant_id ? { ...w, quest } : w)
        }))
    }

    const onStartQuestEvent = () => {
        setBoard((prev) => ({
            ...prev,
            quests: prev.quests+1,
            joiner: prev.joiner.map((j) => ({ ...j, quest: j.quest + 1 })),
            waiter: prev.waiter.map((w) => ({ ...w, quest: w.quest == 0 ? 0 : w.quest - 1 }))
        }))
    }

    const onReplaceEvent = (applicant_id: ManageInstantType["applicant_id"], replace_id: ManageInstantType["applicant_id"]) => {
        setBoard((prev) => {
            const replace_applicant = prev.joiner.find((j) => j.applicant_id == replace_id) || prev.waiter.find((w) => w.applicant_id == replace_id);
            return replace_applicant ? {
                ...prev,
                joiner: prev.joiner.map((j) => j.applicant_id == applicant_id ? {...replace_applicant, quest: 0} : j),
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
        setManagements([]);
        setStashBoards([]);
    }

    return {
        board,
        management_status,
        onJoinEvent,
        onLeaveEvent,
        onReplaceEvent,
        onUpdateQuestEvent,
        onStartQuestEvent,
        onResetBoard,
        postManagementEvent,
        undoBoardEvent,
        rollBackBoardEvent
    }
}