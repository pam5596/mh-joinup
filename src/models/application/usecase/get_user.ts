import AbsUseCase from "./abstruct";
import { UseCaseError } from "@/models/error";

import { GetUserRequestPayload, GetUserResponsePayload } from "../payload/get_user";
import { UserRepository } from "@/models/infrastructure/repository";


export default class GetUserUseCase extends AbsUseCase<GetUserRequestPayload, GetUserResponsePayload> {
    userRepository: UserRepository;

    constructor(
        request: GetUserRequestPayload, 
        userRepository: UserRepository
    ) {
        super(request);
        this.userRepository = userRepository;
    }

    async execute(): Promise<GetUserResponsePayload> {
        const request = this.request.toObject();

        const selected_user = await this.userRepository.selectByChannelId(request.channel_id);

        if (selected_user) {
            return new GetUserResponsePayload(
                selected_user.channel_id,
                selected_user.avatar,
                selected_user.name
            );

        } else {
            throw new UseCaseError("[GetUserUseCase] ユーザが見つかりませんでした", request, 404);
        }
    }
}