import type { ApplicantMessage } from "@/models/domain/value_object";
import { ObjectId } from "mongodb";

export type ApplicantType = {
    id: string,
    user_id: string,
    connection_id: string,
    message: string
}

export type ApplicantDTO = {
    id: ObjectId,
    user_id: ObjectId,
    connection_id: ObjectId,
    message: ApplicantMessage
}