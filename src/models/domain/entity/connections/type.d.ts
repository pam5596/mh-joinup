import type { ConnectYoutubeId, ConnectVideoTitle } from "@/models/domain/value_object";
import { ObjectId } from "mongodb";

export type ConnectionType = {
    id: string,
    user_id: string,
    youtube_id: string,
    video_title: string,
}

export type ConnectionDTO = {
    id: ObjectId,
    user_id: ObjectId,
    youtube_id: ConnectYoutubeId,
    video_title: ConnectVideoTitle,
}