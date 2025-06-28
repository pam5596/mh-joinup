import { z } from "zod";
import { ObjectId } from  "mongodb";

import AbsEmbedded from "@/models/domain/embedded/abstruct";
import type { ManageInstantType, ManageInstantDTO } from "./type";
import { ApplicantMessage, ManageQuest, MongoId, UserAvatar, UserName } from "@/models/domain/value_object";

export class ManageInstant extends AbsEmbedded<ManageInstantType, ManageInstantDTO> {
    private user_id: ObjectId;
    private applicant_id: ObjectId;
    public name: UserName;
    public avatar: UserAvatar;
    public message: ApplicantMessage;
    public quest: ManageQuest;

    constructor(
        user_id: ObjectId,
        applicant_id: ObjectId,
        name: UserName,
        avatar: UserAvatar,
        message: ApplicantMessage,
        quest: ManageQuest
    ){
        super({
            user_id: user_id.toString(),
            applicant_id: applicant_id.toString(),
            name: name.value,
            avatar: avatar.value,
            message: message.value,
            quest: quest.value
        }, ManageInstant.schema());

        this.user_id = user_id;
        this.applicant_id = applicant_id;
        this.name = name;
        this.avatar = avatar;
        this.message = message;
        this.quest = quest;
    }

    static schema() {
        return z.object({
            user_id: MongoId.schema(),
            applicant_id: MongoId.schema(),
            name: UserName.schema(),
            avatar: UserAvatar.schema(),
            message: ApplicantMessage.schema(),
            quest: ManageQuest.schema()
        })
    }

    toObject(): ManageInstantDTO {
        return {
            user_id: this.user_id,
            applicant_id: this.applicant_id,
            name: this.name,
            avatar: this.avatar,
            message: this.message,
            quest: this.quest
        }
    }
}