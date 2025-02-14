import { z } from "zod";
import { ObjectId } from  "mongodb";

import AbsEntity from "../abstruct";
import type { UserType, UserDTO } from "./type";
import { UserChannelId, UserName, UserAvatar } from "@/models/domain/value_object";

export class UserEntity extends AbsEntity<UserType, UserDTO> {  
    public channel_id: UserChannelId;
    public name: UserName;
    public avatar: UserAvatar;
    
    constructor(
        id: ObjectId,
        channel_id: UserChannelId,
        name: UserName,
        avatar: UserAvatar
    ) {
        super(id, {
            channel_id: channel_id.value,
            name: name.value,
            avatar: avatar.value
        }, UserEntity.schema());

        this.channel_id = channel_id;
        this.name = name;
        this.avatar = avatar;
    }
    
    static schema() {
        return z.object({
            channel_id: UserChannelId.schema(),
            name: UserName.schema(),
            avatar: UserAvatar.schema()
        });
    }

    set updateName(name: UserName) {
        this.name = name;
        this._values = UserEntity.schema().parse({
            channel_id: this.channel_id.value,
            name: name.value,
            avatar: this.avatar.value
        })
    }

    set updateAvatar(avatar: UserAvatar) {
        this.avatar = avatar;
        this._values = UserEntity.schema().parse({
            channel_id: this.channel_id.value,
            name: this.name.value,
            avatar: avatar.value
        })
    }

    toObject(): UserDTO {
        return {
            id: this._id,
            channel_id: this.channel_id,
            name: this.name,
            avatar: this.avatar
        };
    }
}