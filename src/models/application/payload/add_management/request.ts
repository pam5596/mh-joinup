import { z } from "zod";
import { ObjectId } from "mongodb";

import AbsPayload from "../abstruct";
import { MongoId, ManageApplicant, ManageQuest } from "@/models/domain/value_object";
import { ManageInstant } from "@/models/domain/embedded";
import type { AddManagementRequestDTO, AddManagementRequestType } from "./type";


export class AddApplicantRequestPayload extends AbsPayload<AddManagementRequestType, AddManagementRequestDTO> {
    protected connection_id: ObjectId;
    protected joiner: ManageInstant[];
    protected waiter: ManageInstant[];
    protected quests: ManageQuest;
    protected applicants: ManageApplicant;

    constructor(
        connection_id: ObjectId,
        joiner: ManageInstant[],
        waiter: ManageInstant[],
        quests: ManageQuest,
        applicants: ManageApplicant
    ) {
        super({
            connection_id: connection_id.toHexString(),
            joiner: joiner.map(i => i.toJson()),
            waiter: waiter.map(i => i.toJson()),
            quests: quests.value,
            applicants: applicants.value
        }, AddApplicantRequestPayload.schema());

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
        });
    }
    
    toObject(): AddManagementRequestDTO {
        return {
            connection_id: this.connection_id,
            joiner: this.joiner.map(i => i.toObject()),
            waiter: this.waiter.map(i => i.toObject()),
            quests: this.quests,
            applicants: this.applicants
        };
    }
}