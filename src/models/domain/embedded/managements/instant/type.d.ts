import { ObjectId } from "mongodb";
import { ApplicantMessage, ManageQuest, UserAvatar, UserName } from "@/models/domain/value_object";

export type ManageInstantType = {
    user_id: string;
    name: string;
    avatar: string;
    applicant_id: string;
    message: string;
    quest: number;
}

export type ManageInstantDTO = {
    user_id: ObjectId;
    name: UserName,
    avatar: UserAvatar,
    applicant_id: ObjectId,
    message: ApplicantMessage
    quest: ManageQuest;
}