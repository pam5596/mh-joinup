import { z } from "zod";
import { ObjectId } from  "mongodb";

import AbsEmbedded from "@/models/domain/embedded/abstruct";
import type { ManageInstantType, ManageInstantDTO } from "./type";
import { ManageQuest, MongoId } from "@/models/domain/value_object";

export class ManageInstant extends AbsEmbedded<ManageInstantType, ManageInstantDTO> {
    private user_id: ObjectId;
    private quest: ManageQuest;

    constructor(
        user_id: ObjectId,
        quest: ManageQuest
    ){
        super({
            user_id: user_id.toString(),
            quest: quest.value
        }, ManageInstant.schema());

        this.user_id = user_id;
        this.quest = quest;
    }

    static schema() {
        return z.object({
            user_id: MongoId.schema(),
            quest: ManageQuest.schema()
        })
    }

    toObject(): ManageInstantDTO {
        return {
            user_id: this.user_id,
            quest: this.quest
        }
    }
}