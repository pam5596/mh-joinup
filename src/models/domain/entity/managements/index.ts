import { z } from "zod";
import { ObjectId } from  "mongodb";

import AbsEntity from "../abstruct";
import type { ManageType, ManageDTO } from "./type";
import { ManageQuest, ManageApplicant, MongoId } from "@/models/domain/value_object";
import { ManageInstant } from "@/models/domain/embedded"

export class ManageEntity extends AbsEntity<ManageType, ManageDTO> {
    private connection_id: ObjectId;
    private joiner: ManageInstant[];
    private waiter: ManageInstant[];
    private quests: ManageQuest;
    private applicants: ManageApplicant;

    constructor(
        id: ObjectId,
        connection_id: ObjectId,
        joiner: ManageInstant[],
        waiter: ManageInstant[],
        quests: ManageQuest,
        applicants: ManageApplicant
    ){
        super(id, {
            connection_id: connection_id.toString(),
            joiner: joiner.map(j => j.toJson()),
            waiter: waiter.map(w => w.toJson()),
            quests: quests.value,
            applicants: applicants.value
        }, ManageEntity.schema());

        this.connection_id = connection_id;
        this.joiner = joiner;
        this.waiter = waiter;
        this.quests = quests;
        this.applicants = applicants;
    }

    static schema() {
        return z.object({
            connection_id: MongoId.schema(),
            joiner: z.array(ManageInstant.schema()),
            waiter: z.array(ManageInstant.schema()),
            quests: ManageQuest.schema(),
            applicants: ManageApplicant.schema()
        })
    }

    toObject(): ManageDTO {
        return {
            id: this._id,
            connection_id: this.connection_id,
            joiner: this.joiner.map(j => j.toObject()),
            waiter: this.waiter.map(w => w.toObject()),
            quests: this.quests,
            applicants: this.applicants
        }
    }
}