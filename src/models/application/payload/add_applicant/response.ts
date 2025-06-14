import { z } from "zod";
import { ObjectId } from "mongodb";

import AbsPayload from "../abstruct";
import { MongoId } from "@/models/domain/value_object";
import type { AddApplicantResponseDTO, AddApplicantResponseType } from "./type";


export class AddApplicantResponsePayload extends AbsPayload<AddApplicantResponseType, AddApplicantResponseDTO> {
    applicant_id: ObjectId;
    user_id: ObjectId;

    constructor(applicant_id: ObjectId, user_id: ObjectId) {
        super({
            applicant_id: applicant_id.toHexString(),
            user_id: user_id.toHexString()
        }, AddApplicantResponsePayload.schema());

        this.applicant_id = applicant_id;
        this.user_id = user_id;
    }

    static schema() {
        return z.object({
            applicant_id: MongoId.schema(),
            user_id: MongoId.schema()
        });
    }

    toObject(): AddApplicantResponseDTO {
        return {
            applicant_id: this.applicant_id,
            user_id: this.user_id
        };
    }
}