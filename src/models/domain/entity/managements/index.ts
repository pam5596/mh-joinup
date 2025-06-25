import { z } from "zod";
import { ObjectId } from  "mongodb";

import AbsEntity from "../abstruct";
import type { ManageType, ManageDTO } from "./type";
import { ManageQuest, ManageApplicant } from "@/models/domain/value_object";
import { ManageInstant } from "@/models/domain/embedded"

export class ManageEntity extends AbsEntity<ManageType, ManageDTO> {
    private joiner: ManageInstant[];
    private waiter: ManageInstant[];
    private quests: ManageQuest;
    private applicants: ManageApplicant;

    constructor(
        id: ObjectId,
        joiner: ManageInstant[],
        waiter: ManageInstant[],
        quests: ManageQuest,
        applicants: ManageApplicant
    ){
        super(id, {
            joiner: joiner.map(j => j.toJson()),
            waiter: waiter.map(w => w.toJson()),
            quests: quests.value,
            applicants: applicants.value
        }, ManageEntity.schema());

        this.joiner = joiner;
        this.waiter = waiter;
        this.quests = quests;
        this.applicants = applicants;
    }

    static schema() {
        return z.object({
            joiner: z.array(ManageInstant.schema()),
            waiter: z.array(ManageInstant.schema()),
            quests: ManageQuest.schema(),
            applicants: ManageApplicant.schema()
        })
    }

    toObject(): ManageDTO {
        return {
            id: this._id,
            joiner: this.joiner.map(j => j.toObject()),
            waiter: this.waiter.map(w => w.toObject()),
            quests: this.quests,
            applicants: this.applicants
        }
    }
}