import AbsService from "./abstruct";
import { ServiceError } from "@/models/error";

import { TokenResponse } from "@react-oauth/google";
import { youtube_v3 } from "googleapis";


export default class GetChannelInfoService extends AbsService<TokenResponse, youtube_v3.Schema$ChannelProfileDetails> {
    async execute(request: TokenResponse): Promise<youtube_v3.Schema$ChannelProfileDetails> {
        const response = await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${request.access_token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new ServiceError(
            "ユーザチャンネルの取得に失敗しました",
            request,
            response.status,
        )

        return await response.json();
    }
}