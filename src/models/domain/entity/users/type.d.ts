import type { UserChannelId, UserAvatar, UserName } from "@/models/domain/value_object";

export type UserType = {
    channel_id: string;
    name: string;
    avatar: string;
}

export type UserDTO = {
    channel_id: UserChannelId;
    name: UserName;
    avatar: UserAvatar;
}