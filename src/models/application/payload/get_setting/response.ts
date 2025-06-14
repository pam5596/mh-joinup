import { z } from "zod";
import { ObjectId } from "mongodb";

import AbsPayload from "../abstruct";
import { MongoId, SettingKeyWord } from "@/models/domain/value_object";
import type { GetSettingResponseDTO, GetSettingResponseType } from "./type";


export class GetSettingResponsePayload extends AbsPayload<GetSettingResponseType, GetSettingResponseDTO> {
    protected setting_id: ObjectId;
    protected keywords: SettingKeyWord[];

    constructor(
        setting_id: ObjectId,
        keywords: SettingKeyWord[]
    ) {
        super({
            setting_id: setting_id.toHexString(),
            keywords: keywords.map(keyword => keyword.value)
        }, GetSettingResponsePayload.schema());

        this.setting_id = setting_id;
        this.keywords = keywords;
    }

    static schema() {
        return z.object({
            setting_id: MongoId.schema(),
            keywords: z.array(SettingKeyWord.schema())
        });
    }

    toObject(): GetSettingResponseDTO {
        return {
            setting_id: this.setting_id,
            keywords: this.keywords
        };
    }
}