import { ObjectId } from "mongodb";

import AbsUseCase from "./abstruct";
import { AddApplicantRequestPayload, AddApplicantResponsePayload } from "../payload";
import { UserRepository, ApplicantRepository } from "@/models/infrastructure/repository";
import { UserEntity, ApplicantEntity } from "@/models/domain/entity";

export default class AddApplicantUseCase extends AbsUseCase<AddApplicantRequestPayload, AddApplicantResponsePayload> {
    userRepository: UserRepository;
    applicantRepository: ApplicantRepository;

    constructor(request: AddApplicantRequestPayload, userRepository: UserRepository, applicantRepository: ApplicantRepository) {
        super(request);
        this.userRepository = userRepository;
        this.applicantRepository = applicantRepository;
    }

    async execute(): Promise<AddApplicantResponsePayload> {
        const request = this.request.toObject();

        const selected_user = await this.userRepository.selectByChannelId(request.channel_id);
        let user_id: ObjectId;

        if (selected_user) {
            user_id = selected_user.objectId;
        } else {
            const upsert_user = new UserEntity(
                new ObjectId(),
                request.channel_id,
                request.name,
                request.avatar
            )

            user_id = await this.userRepository.upsertByChannelId(upsert_user) as ObjectId;
        }

        const insert_applicant = new ApplicantEntity(
            new ObjectId(),
            user_id,
            request.connection_id,
            request.message
        )

        const inserted_applicant_id = await this.applicantRepository.insert(insert_applicant) as ObjectId;
        return new AddApplicantResponsePayload(
            inserted_applicant_id,
            user_id
        );
    }
}