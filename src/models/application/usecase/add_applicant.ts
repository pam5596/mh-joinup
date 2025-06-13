import { ObjectId } from "mongodb";

import AbsUseCase from "./abstruct";
import { AddApplicantRequestPayload, AddApplicantResponsePayload } from "../payload";
import { GetUserIdService } from "../service";
import { ApplicantRepository } from "@/models/infrastructure/repository";
import { UserEntity, ApplicantEntity } from "@/models/domain/entity";

export default class AddApplicantUseCase extends AbsUseCase<AddApplicantRequestPayload, AddApplicantResponsePayload> {
    applicantRepository: ApplicantRepository;
    getUserIdService: GetUserIdService;

    constructor(
        request: AddApplicantRequestPayload, 
        applicantRepository: ApplicantRepository, 
        getUserIdService: GetUserIdService
    ) {
        super(request);
        this.applicantRepository = applicantRepository;
        this.getUserIdService = getUserIdService;
    }

    async execute(): Promise<AddApplicantResponsePayload> {
        const request = this.request.toObject();

        const select_user = new UserEntity(
            new ObjectId(),
            request.channel_id,
            request.name,
            request.avatar
        )
        const selected_user_id = await this.getUserIdService.execute(select_user);

        const insert_applicant = new ApplicantEntity(
            new ObjectId(),
            selected_user_id,
            request.connection_id,
            request.message
        );

        const inserted_applicant_id = await this.applicantRepository.insert(insert_applicant) as ObjectId;
        return new AddApplicantResponsePayload(
            inserted_applicant_id,
            selected_user_id
        );
    }
}