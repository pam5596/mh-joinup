import AbsUseCase from "../abstruct";
import { UseCaseError } from "@/models/error";

import { BrowserSourcePayload } from "../../payload";
import { UserRepository } from "@/models/infrastructure/repository";
import { UserChannelId } from "@/models/domain/value_object";


export default class BrowserSourceGETUseCase extends AbsUseCase<BrowserSourcePayload.GETRequestType, BrowserSourcePayload.GETResponseType> {
    userRepository: UserRepository

    constructor(
        request: Request,
        userRepository: UserRepository
    ) {
        super(request)
        this.userRepository = userRepository
    }

    async execute(): Promise<BrowserSourcePayload.GETResponseType> {
        const search_params = new URL(this.request.url).searchParams
        const channel_id = search_params.get('channel_id')

        if (!channel_id) throw new UseCaseError(
            'クエリパラメータにchannel_idが含まれていません',
            this.request.url,
            400
        )

        const selected_user = await this.userRepository.selectByChannelId(new UserChannelId(channel_id))

        if (!selected_user) throw new UseCaseError(
            'ユーザが見つかりませんでした。ログインし直してください。',
            channel_id,
            404
        )

        return {
            channel_id,
            name: selected_user.name.value,
            avatar: selected_user.avatar.value
        }
    }
}