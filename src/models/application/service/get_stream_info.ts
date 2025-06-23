import AbsService from "./abstruct";
import { ServiceError } from "@/models/error";

import { youtube_v3 } from "googleapis";

export default class GetStreamsInfoService extends AbsService<{auth_token: string}, youtube_v3.Schema$LiveBroadcast> {
    async execute(request: {auth_token: string}): Promise<youtube_v3.Schema$LiveBroadcast> {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet&broadcastStatus=active`,
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

        const response_data = await response.json() as youtube_v3.Schema$LiveBroadcastListResponse;

        if (response_data.kind != "youtube#liveBroadcastListResponse") throw new ServiceError(
            "YoutubeDataAPIのレスポンスが正しくありません。異なるリクエストを送信した可能性があります。",
            response_data,
            400
        );

        if (!response_data.items) throw new ServiceError(
            "YoutubeDataAPIのレスポンスにチャンネル情報が含まれていません。Youtubeチャンネルを作成してください。",
            response_data,
            400
        );

        if (!response_data.items.length) throw new ServiceError(
            "ユーザーチャンネルでライブ配信コンテンツが見つかりませんでした。",
            response_data,
            404
        );

        return response_data.items[0];
    }
}