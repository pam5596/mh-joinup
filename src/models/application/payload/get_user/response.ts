import { z } from "zod";

import AbsPayload from "../abstruct";
import { UserChannelId, UserAvatar, UserName } from "@/models/domain/value_object";
import type { GetUserResponseDTO, GetUserResponseType } from "./type";


export class GetUserResponsePayload extends AbsPayload<GetUserResponseType, GetUserResponseDTO> {
    protected channel_id: UserChannelId;
    protected avatar: UserAvatar;
    protected name: UserName;

    constructor(
        channel_id: UserChannelId,
        avatar: UserAvatar,
        name: UserName
    ) {
        super({
            channel_id: channel_id.value,
            avatar: avatar.value,
            name: name.value
        }, GetUserResponsePayload.schema());

        this.channel_id = channel_id;
        this.avatar = avatar;
        this.name = name;
    }

    static schema() {
        return z.object({
            channel_id: UserChannelId.schema(),
            avatar: UserAvatar.schema(),
            name: UserName.schema()
        });
    }

    toObject(): GetUserResponseDTO {
        return {
            channel_id: this.channel_id,
            avatar: this.avatar,
            name: this.name
        };
    }
}