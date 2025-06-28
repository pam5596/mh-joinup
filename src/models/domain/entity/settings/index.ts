import { z } from "zod";
import { ObjectId } from  "mongodb";

import AbsEntity from "../abstruct";
import type { SettingType, SettingDTO } from "./type";
import { SettingKeyWord, SettingQuest, MongoId } from "@/models/domain/value_object";

export class SettingEntity extends AbsEntity<SettingType, SettingDTO> {  
    public user_id: ObjectId;
    public keywords: SettingKeyWord[];
    public quest: SettingQuest;
    
    constructor(
        id: ObjectId,
        user_id: ObjectId,
        keywords: SettingKeyWord[],
        quest: SettingQuest
    ) {
        super(id, {
            user_id: user_id.toString(),
            keywords: keywords.map(keyword => keyword.value),
            quest: quest.value
        }, SettingEntity.schema());

        this.user_id = user_id;
        this.keywords = keywords;
        this.quest = quest;
    }
    
    static schema() {
        return z.object({
            user_id: MongoId.schema(),
            keywords: z.array(SettingKeyWord.schema()),
            quest: SettingQuest.schema()
        });
    }

    toObject(): SettingDTO {
        return {
            id: this._id,
            user_id: this.user_id,
            keywords: this.keywords,
            quest: this.quest
        };
    }
}