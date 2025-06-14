import { ObjectId } from "mongodb";
import { ManageQuest, ManageApplicant } from "@/models/domain/value_object";

export type ManageType = {
    id: string;
    connection_id: string;
    joiner: ManageInstantType[];
    waiter: ManageInstantType[];
    quests: number;
    applicants: number;
}

export type ManageDTO = {
    id: ObjectId;
    connection_id: ObjectId;
    joiner: ManageInstantDTO[];
    waiter: ManageInstantDTO[];
    quests: ManageQuest;
    applicants: ManageApplicant;
}