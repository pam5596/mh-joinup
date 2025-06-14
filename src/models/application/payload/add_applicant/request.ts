import { z } from "zod";
import { ObjectId } from "mongodb";

import AbsPayload from "../abstruct";
import { MongoId, UserChannelId, UserName, UserAvatar, ApplicantMessage } from "@/models/domain/value_object";
import type { AddApplicantRequestDTO, AddApplicantRequestType } from "./type";


export class AddApplicantRequestPayload extends AbsPayload<AddApplicantRequestType, AddApplicantRequestDTO> {
    protected channel_id: UserChannelId;
    protected name: UserName;
    protected avatar: UserAvatar;
    protected connection_id: ObjectId;
    protected message: ApplicantMessage;

    constructor(
        channel_id: UserChannelId,
        name: UserName,
        avatar: UserAvatar,
        connection_id: ObjectId,
        message: ApplicantMessage
    ) {
        super({
            channel_id: channel_id.value,
            name: name.value,
            avatar: avatar.value,
            connection_id: connection_id.toHexString(),
            message: message.value
        }, AddApplicantRequestPayload.schema());

        this.channel_id = channel_id;
        this.name = name;
        this.avatar = avatar;
        this.connection_id = connection_id;
        this.message = message;
    }

    static schema() {
        return z.object({
            channel_id: UserChannelId.schema(),
            name: UserName.schema(),
            avatar: UserAvatar.schema(),
            connection_id: MongoId.schema(),
            message: ApplicantMessage.schema()
        });
    }

    toObject(): AddApplicantRequestDTO {
        return {
            channel_id: this.channel_id,
            name: this.name,
            avatar: this.avatar,
            connection_id: this.connection_id,
            message: this.message
        };
    }
}