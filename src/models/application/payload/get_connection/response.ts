import { z } from "zod";
import { ObjectId } from "mongodb";

import AbsPayload from "../abstruct";
import { MongoId, ConnectYoutubeId, ConnectVideoTitle } from "@/models/domain/value_object";
import type { GetConnectionResponseDTO, GetConnectionResponseType } from "./type";


export class GetConnectionResponsePayload extends AbsPayload<GetConnectionResponseType, GetConnectionResponseDTO> {
    protected connection_id: ObjectId;
    protected youtube_id: ConnectYoutubeId;
    protected video_title: ConnectVideoTitle;

    constructor(
        connection_id: ObjectId,
        youtube_id: ConnectYoutubeId,
        video_title: ConnectVideoTitle
    ) {
        super({
            connection_id: connection_id.toHexString(),
            youtube_id: youtube_id.value,
            video_title: video_title.value
        }, GetConnectionResponsePayload.schema());

        this.connection_id = connection_id;
        this.youtube_id = youtube_id;
        this.video_title = video_title;
    }


    static schema() {
        return z.object({
            connection_id: MongoId.schema(),
            youtube_id: ConnectYoutubeId.schema(),
            video_title: ConnectVideoTitle.schema()
        });
    }

    toObject(): GetConnectionResponseDTO {
        return {
            connection_id: this.connection_id,
            youtube_id: this.youtube_id,
            video_title: this.video_title
        };
    }
}