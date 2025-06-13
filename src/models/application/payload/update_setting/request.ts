import { z } from "zod";
import { ObjectId } from "mongodb";

import AbsPayload from "../abstruct";
import { MongoId, SettingKeyWord } from "@/models/domain/value_object";
import type { UpdateSettingRequestDTO, UpdateSettingRequestType } from "./type";


export class UpdateSettingRequestPayload extends AbsPayload<UpdateSettingRequestType, UpdateSettingRequestDTO> {
    protected setting_id: ObjectId;
    protected keywords: SettingKeyWord[];

    constructor(
        setting_id: ObjectId,
        keywords: SettingKeyWord[]
    ) {
        super({
            setting_id: setting_id.toHexString(),
            keywords: keywords.map(keyword => keyword.value)
        }, UpdateSettingRequestPayload.schema());

        this.setting_id = setting_id;
        this.keywords = keywords;
    }

    static schema() {
        return z.object({
            setting_id: MongoId.schema(),
            keywords: z.array(SettingKeyWord.schema())
        });
    }

    toObject(): UpdateSettingRequestDTO {
        return {
            setting_id: this.setting_id,
            keywords: this.keywords
        };
    }
}