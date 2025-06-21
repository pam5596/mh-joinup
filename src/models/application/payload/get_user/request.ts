import { z } from "zod";
import { ObjectId } from "mongodb";

import AbsPayload from "../abstruct";
import { MongoId } from "@/models/domain/value_object";
import type { GetUserRequestDTO, GetUserRequestType } from "./type";


export class GetUserRequestPayload extends AbsPayload<GetUserRequestType, GetUserRequestDTO> {
    protected user_id: ObjectId;
    
    constructor(user_id: ObjectId) {
        super({ user_id: user_id.toHexString() }, GetUserRequestPayload.schema());
        this.user_id = user_id;
    }

    static schema() {
        return z.object({
            user_id: MongoId.schema()
        });
    }

    toObject(): GetUserRequestDTO {
        return {
            user_id: this.user_id
        };
    }
}