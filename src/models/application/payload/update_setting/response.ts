import { z } from "zod";
import { ObjectId } from "mongodb";

import AbsPayload from "../abstruct";
import { MongoId } from "@/models/domain/value_object";
import type { UpdateSettingResponseDTO, UpdateSettingResponseType } from "./type";


export class UpdateSettingResponsePayload extends AbsPayload<UpdateSettingResponseType, UpdateSettingResponseDTO> {
    protected setting_id: ObjectId;

    constructor(setting_id: ObjectId) {
        super({
            setting_id: setting_id.toHexString()
        }, UpdateSettingResponsePayload.schema());

        this.setting_id = setting_id;
    }

    static schema() {
        return z.object({
            setting_id: MongoId.schema()
        });
    }

    toObject(): UpdateSettingResponseDTO {
        return {
            setting_id: this.setting_id
        };
    }
}
