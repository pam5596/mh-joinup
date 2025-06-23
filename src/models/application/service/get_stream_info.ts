import AbsService from "./abstruct";
import { ServiceError } from "@/models/error";

import { UserChannelId } from "@/models/domain/value_object";
import { youtube_v3 } from "googleapis";


export default class GetStreamsInfoService extends AbsService<{auth_token: string, channel_id: UserChannelId}, youtube_v3.Schema$SearchListResponse> {
    async execute(request: {auth_token: string, channel_id: UserChannelId}): Promise<youtube_v3.Schema$SearchListResponse> {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${request.channel_id.value}&eventType=live&type=video`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${request.auth_token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) throw new ServiceError(
            "ユーザーのライブ配信の取得に失敗しました",
            response,
            response.status,
        )

        return await response.json();
    }
}