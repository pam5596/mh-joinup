import AbsUseCase from "../abstruct";
import { UseCaseError } from "@/models/error";

import { ObjectId } from "mongodb";
import { ConnectionPayload } from "@/models/application/payload";
import { CookieParseService, GetStreamInfoService, GetConnectionIdService } from "@/models/application/service";
import { ConnectionEntity } from "@/models/domain/entity";
import { ConnectVideoTitle, ConnectYoutubeId } from "@/models/domain/value_object";


export default class ConnectionGETUseCase extends AbsUseCase<ConnectionPayload.GETRequestType, ConnectionPayload.GETResponseType> {
    cookieParseService: CookieParseService;
    getStreamInfoService: GetStreamInfoService;
    getConnectionIdService: GetConnectionIdService;

    constructor(
        request: ConnectionPayload.GETRequestType,
        cookieParseService: CookieParseService,
        getStreamInfoService: GetStreamInfoService,
        getConnectionIdService: GetConnectionIdService
    ) {
        super(request)
        this.cookieParseService = cookieParseService
        this.getStreamInfoService = getStreamInfoService
        this.getConnectionIdService = getConnectionIdService
    }

    async execute(): Promise<ConnectionPayload.GETResponseType> {
        const { user_id, auth_token } = await this.cookieParseService.execute(this.request);
        const connection_info = await this.getStreamInfoService.execute({ auth_token });
        
        if (!connection_info.id || !connection_info.snippet?.title || !connection_info.snippet?.channelId) 
            throw new UseCaseError(
                "ライブ配信のid, title. channnelIdを取得できませんでした。",
                connection_info, 400
            )
        
        const insert_connection = new ConnectionEntity(
            new ObjectId(),
            user_id,
            new ConnectYoutubeId(connection_info.id),
            new ConnectVideoTitle(connection_info.snippet.title)
        );

        const connection_id = await this.getConnectionIdService.execute(insert_connection);

        return {
            connection_id: connection_id.toHexString(),
            channel_id: connection_info.snippet.channelId,
            youtube_id: insert_connection.youtube_id.value,
            video_title: insert_connection.video_title.value
        }
    }
}