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

        const response_data = await response.json();

        if (!response.ok) throw new ServiceError(
            response_data.error.message,
            response,
            response.status,
        )

        if (response_data.kind != "youtube#liveBroadcastListResponse") throw new ServiceError(
            "YoutubeDataAPIのレスポンスが不正です。異なるリクエストを送信した可能性があります。",
            response_data,
            400
        );

        if (!response_data.items) throw new ServiceError(
            "YoutubeDataAPIのレスポンスにチャンネル情報が含まれていません。Youtubeチャンネルを作成してください。",
            response_data,
            400
        );

        if (!response_data.items.length) throw new ServiceError(
            "ユーザーチャンネルで配信中のライブコンテンツが見つかりませんでした。配信を開始してください。",
            response_data,
            404
        );

        return response_data.items[0];
    }
}