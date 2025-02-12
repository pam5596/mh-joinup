import { z } from "zod";
import { ObjectId } from  "mongodb";

import AbsEntity from "../abstruct";
import type { ApplicantType, ApplicantDTO } from "./type";
import { ApplicantMessage, MongoId } from "@/models/domain/value_object";

export class ApplicantsEntity extends AbsEntity<ApplicantType, ApplicantDTO> {
    private user_id: ObjectId;
    private connection_id: ObjectId;
    private message: ApplicantMessage;

    constructor(
        id: ObjectId,
        user_id: ObjectId,
        connection_id: ObjectId,
        message: ApplicantMessage
    ){
        super(id, {
            user_id: user_id.toString(),
            connection_id: connection_id.toString(),
            message: message.value
        }, ApplicantsEntity.schema());

        this.user_id = user_id;
        this.connection_id = connection_id;
        this.message = message;
    }

    static schema() {
        return z.object({
            user_id: MongoId.schema(),
            connection_id: MongoId.schema(),
            message: ApplicantMessage.schema()
        })
    }

    toObject(): ApplicantDTO {
        return {
            id: this._id,
            user_id: this.user_id,
            connection_id: this.connection_id,
            message: this.message
        }
    }
}