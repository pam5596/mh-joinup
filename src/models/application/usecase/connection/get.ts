import AbsUseCase from "../abstruct";
import { UseCaseError } from "@/models/error";

import { ConnectionPayload } from "@/models/application/payload";
import { CookieParseService, GetStreamInfoService } from "@/models/application/service";
import { UserRepository } from "@/models/infrastructure/repository";


export default class ConnectionGETUseCase extends AbsUseCase<ConnectionPayload.GETRequestType, ConnectionPayload.GETResponseType> {
    userRepository: UserRepository;
    cookieParseService: CookieParseService;
    getStreamInfoService: GetStreamInfoService;

    constructor(
        request: ConnectionPayload.GETRequestType,
        userRepository: UserRepository,
        cookieParseService: CookieParseService,
        getStreamInfoService: GetStreamInfoService
    ) {
        super(request)
        this.userRepository = userRepository
        this.cookieParseService = cookieParseService
        this.getStreamInfoService = getStreamInfoService
    }

    async execute(): Promise<ConnectionPayload.GETResponseType> {
        const { user_id, auth_token } = await this.cookieParseService.execute(this.request);

        const selected_user = await this.userRepository.selectById(user_id);
        if (!selected_user) throw new UseCaseError("ユーザが見つかりませんでした", user_id, 404);

        const stream_info = await this.getStreamInfoService.execute({ auth_token, channel_id: selected_user.channel_id });

        if (stream_info.kind != "youtube#searchListResponse") throw new UseCaseError(
            "YoutubeDataAPIのレスポンスが正しくありません。異なるリクエストを送信した可能性があります。",
            stream_info,
            400
        );

        if (!stream_info.items) throw new UseCaseError(
            "YoutubeDataAPIのレスポンスにチャンネル情報が含まれていません。Youtubeチャンネルを作成してください。",
            stream_info,
            400
        );

        if (!stream_info.items.length) throw new UseCaseError(
            "ユーザーチャンネルで配信中のライブが見つかりませんでした。",
            stream_info,
            404
        );

        // [TODO] 実際に配信してちゃんと取得できるかチャレンジする
        return stream_info as ConnectionPayload.GETResponseType
    }
}