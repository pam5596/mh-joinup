import AbsUseCase from "../abstruct";

import { ManagementPayload } from "@/models/application//payload";
import { ManagementRepository } from "@/models/infrastructure/repository";
import { ManageEntity } from "@/models/domain/entity";
import { ManageInstant } from "@/models/domain/embedded";
import { ApplicantMessage, ManageApplicant, ManageQuest, UserAvatar, UserName } from "@/models/domain/value_object";
import { ObjectId } from "mongodb";

export default class ManagementPOSTUseCase extends AbsUseCase<ManagementPayload.POSTRequestType, ManagementPayload.POSTResponseType> {
    managementRepository: ManagementRepository;

    constructor(
        request: ManagementPayload.POSTRequestType,
        managementRepository: ManagementRepository
    ) {
        super(request)
        this.managementRepository = managementRepository
    }

    async execute(): Promise<ManagementPayload.POSTResponseType> {
        const management = new ManageEntity(
            new ObjectId(),
            new ObjectId(this.request.connection_id),
            this.request.joiner.map((joiner) => new ManageInstant(
                new ObjectId(joiner.user_id),
                new ObjectId(joiner.applicant_id),
                new UserName(joiner.name),
                new UserAvatar(joiner.avatar),
                new ApplicantMessage(joiner.message),
                new ManageQuest(joiner.quest)
            )),
            this.request.waiter.map((waiter) => new ManageInstant(
                new ObjectId(waiter.user_id),
                new ObjectId(waiter.applicant_id),
                new UserName(waiter.name),
                new UserAvatar(waiter.avatar),
                new ApplicantMessage(waiter.message),
                new ManageQuest(waiter.quest)
            )),
            new ManageQuest(this.request.quests),
            new ManageApplicant(this.request.applicants)
        );

        const inserted_manage_id = await this.managementRepository.insert(management);

        return {
            management_id: inserted_manage_id.toHexString()
        }
    }
}