import { z } from "zod";
import { ObjectId } from  "mongodb";

import AbsEntity from "../abstruct";
import type { ConnectionType, ConnectionDTO } from "./type";
import { ConnectYoutubeId, ConnectVideoTitle, MongoId } from "@/models/domain/value_object";

export class ConnectionEntity extends AbsEntity<ConnectionType, ConnectionDTO> {
    private user_id: ObjectId;
    private youtube_id: ConnectYoutubeId;
    private video_title: ConnectVideoTitle;

    constructor(
        id: ObjectId,
        user_id: ObjectId,
        youtube_id: ConnectYoutubeId,
        video_title: ConnectVideoTitle,
    ){
        super(id, {
            user_id: user_id.toString(),
            youtube_id: youtube_id.value,
            video_title: video_title.value,
        }, ConnectionEntity.schema());

        this.user_id = user_id;
        this.youtube_id = youtube_id
        this.video_title = video_title
    }

    static schema() {
        return z.object({
            user_id: MongoId.schema(),
            youtube_id: ConnectYoutubeId.schema(),
            video_title: ConnectVideoTitle.schema(),
        })
    }

    set updateVideoTitle(video_title: ConnectVideoTitle) {
        this.video_title = video_title;
        this._values = ConnectionEntity.schema().parse({
            user_id: this.user_id.toString(),
            youtube_id: this.youtube_id.value,
            video_title: video_title.value,
        })
    }

    toObject(): ConnectionDTO {
        return {
            id: this._id,
            user_id: this.user_id,
            youtube_id: this.youtube_id,
            video_title: this.video_title,
        }
    }
}