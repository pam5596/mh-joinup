import AbsUseCase from "../abstruct";

import { ApplicantPayload } from "@/models/application/payload";
import { GetUserIdService } from "@/models/application/service";
import { ApplicantRepository } from "@/models/infrastructure/repository";
import { ApplicantEntity, UserEntity } from "@/models/domain/entity";
import { UserAvatar, UserChannelId, UserName, ApplicantMessage } from "@/models/domain/value_object";
import { ObjectId } from "mongodb";

export default class ApplicantPOSTUseCase extends AbsUseCase<ApplicantPayload.POSTRequestType, ApplicantPayload.POSTResponseType> {
    applicantRepository: ApplicantRepository;
    getUserIdService: GetUserIdService;

    constructor(
        request: ApplicantPayload.POSTRequestType,
        applicantRepository: ApplicantRepository,
        getUserIdService: GetUserIdService
    ) {
        super(request)
        this.applicantRepository = applicantRepository
        this.getUserIdService = getUserIdService
    }

    async execute(): Promise<ApplicantPayload.POSTResponseType> {
        const applicants = await Promise.all(
            this.request.chat_data.map(async(chatData) => {
                const user = new UserEntity(
                    new ObjectId(),
                    new UserChannelId(chatData.channel_id),
                    new UserName(chatData.name),
                    new UserAvatar(chatData.avatar)
                );
                const user_id = await this.getUserIdService.execute(user);

                const applicant = new ApplicantEntity(
                    new ObjectId(),
                    user_id,
                    new ObjectId(this.request.connection_id),
                    new ApplicantMessage(chatData.message)
                );
                const applicant_id = await this.applicantRepository.insert(applicant)

                return {
                    user_id: user_id.toHexString(),
                    name: user.name.value,
                    avatar: user.avatar.value,
                    applicant_id: applicant_id.toHexString(),
                    message: applicant.message.value
                }
            })
        );

        return { applicants };
    }
}