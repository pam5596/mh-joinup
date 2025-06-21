import AbsUseCase from "./abstruct";
import { UseCaseError } from "@/models/error";

import { TokenResponse } from "@react-oauth/google";
import { ObjectId } from "mongodb";

import { GetUserIdService, GetChannelInfoService } from "../service";
import { UserEntity } from "@/models/domain/entity";
import { UserChannelId, UserName, UserAvatar } from "@/models/domain/value_object";


export default class GoogleOAuthUseCase extends AbsUseCase<TokenResponse, ObjectId> {
    getUserIdService: GetUserIdService;
    getChannelInfoService: GetChannelInfoService;

    constructor(
        request: TokenResponse,
        getUserIdService: GetUserIdService,
        getChannelInfoService: GetChannelInfoService
    ) {
        super(request);
        this.getUserIdService = getUserIdService;
        this.getChannelInfoService = getChannelInfoService;
    }

    async execute(): Promise<ObjectId> {
        const channel_info = await this.getChannelInfoService.execute(this.request);

        if (channel_info.kind != "youtube#channelListResponse") throw new UseCaseError(
            "YoutubeDataAPIのレスポンスが正しくありません。https://www.googleapis.com/auth/youtube.readonlyがスコープに含まれているか確認してください。",
            channel_info.kind,
            403
        )

        if (!channel_info.items) throw new UseCaseError(
            "YoutubeDataAPIのレスポンスにチャンネル情報が含まれていません。Youtubeチャンネルを作成してください。",
            channel_info,
            400
        )

        const user_channel_info = channel_info.items[0];

        const user_channel_id = user_channel_info.id;
        const user_name = user_channel_info.snippet?.localized?.title;
        const user_avatar = user_channel_info.snippet?.thumbnails?.default?.url;

        if (!user_channel_id || !user_name || !user_avatar) throw new UseCaseError(
            "YoutubeDataAPIのレスポンスに必要な情報が含まれていません。Youtubeチャンネルを作成してください。",
            channel_info,
            400
        )

        const user_entity = new UserEntity(
            new ObjectId(),
            new UserChannelId(user_channel_id),
            new UserName(user_name),
            new UserAvatar(user_avatar)
        )

        const user_id = await this.getUserIdService.execute(user_entity);

        return user_id;
    }
}