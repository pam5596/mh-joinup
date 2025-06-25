import { ObjectId } from "mongodb";
import { ManageQuest, ManageApplicant } from "@/models/domain/value_object";
import { ManageInstantType } from "@/models/domain/embedded/managements/instant/type";

export type ManageType = {
    id: string;
    joiner: ManageInstantType[];
    waiter: ManageInstantType[];
    quests: number;
    applicants: number;
}

export type ManageDTO = {
    id: ObjectId;
    joiner: ManageInstantDTO[];
    waiter: ManageInstantDTO[];
    quests: ManageQuest;
    applicants: ManageApplicant;
}