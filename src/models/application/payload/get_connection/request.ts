import { z } from "zod";

import AbsPayload from "../abstruct";
import { UserChannelId } from "@/models/domain/value_object";
import type { GetConnectionRequestDTO, GetConnectionRequestType } from "./type";


export class GetConnectionRequestPayload extends AbsPayload<GetConnectionRequestType, GetConnectionRequestDTO> {
    protected channel_id: UserChannelId;

    constructor(channel_id: UserChannelId) {
        super({ channel_id: channel_id.value }, GetConnectionRequestPayload.schema());
        this.channel_id = channel_id;
    }


    static schema() {
        return z.object({
            channel_id: UserChannelId.schema()
        });
    }

    toObject(): GetConnectionRequestDTO {
        return {
            channel_id: this.channel_id
        };
    }
}