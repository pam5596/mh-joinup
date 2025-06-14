import { z } from "zod";
import { ObjectId } from "mongodb";

import AbsPayload from "../abstruct";
import { MongoId } from "@/models/domain/value_object";
import type { AddManagementResponseDTO, AddManagementResponseType } from "./type";


export class AddManagementResponsePayload extends AbsPayload<AddManagementResponseType, AddManagementResponseDTO> {
    protected management_id: ObjectId;

    constructor(management_id: ObjectId) {
        super({
            management_id: management_id.toHexString()
        }, AddManagementResponsePayload.schema());

        this.management_id = management_id;
    }

    static schema() {
        return z.object({
            management_id: MongoId.schema()
        });
    }

    toObject(): AddManagementResponseDTO {
        return {
            management_id: this.management_id
        };
    }
}