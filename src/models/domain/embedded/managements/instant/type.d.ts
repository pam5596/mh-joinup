import { ObjectId } from "mongodb";
import { ManageQuest } from "@/models/domain/value_object";

export type ManageInstantType = {
    user_id: string;
    quest: number;
}

export type ManageInstantDTO = {
    user_id: ObjectId;
    quest: ManageQuest;
}