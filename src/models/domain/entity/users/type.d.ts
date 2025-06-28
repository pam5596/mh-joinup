import type { UserChannelId, UserAvatar, UserName } from "@/models/domain/value_object";
import { ObjectId } from "mongodb";

export type UserType = {
    id: string;
    channel_id: string;
    name: string;
    avatar: string;
}

export type UserDTO = {
    id: ObjectId;
    channel_id: UserChannelId;
    name: UserName;
    avatar: UserAvatar;
}