import { z } from "zod";

import AbsPayload from "../abstruct";
import { UserChannelId } from "@/models/domain/value_object";
import type { GetUserRequestDTO, GetUserRequestType } from "./type";


export class GetUserRequestPayload extends AbsPayload<GetUserRequestType, GetUserRequestDTO> {
    protected channel_id: UserChannelId;

    constructor(channel_id: UserChannelId) {
        super({ channel_id: channel_id.value }, GetUserRequestPayload.schema());
        this.channel_id = channel_id;
    }

    static schema() {
        return z.object({
            channel_id: UserChannelId.schema()
        });
    }

    toObject(): GetUserRequestDTO {
        return {
            channel_id: this.channel_id
        };
    }
}