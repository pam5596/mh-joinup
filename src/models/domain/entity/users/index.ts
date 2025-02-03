import { z } from "zod";
import { ObjectId } from  "mongodb";

import AbsEntity from "../abstruct";
import type { UserType, UserDTO } from "./type";
import { UserChannelId, UserName, UserAvatar } from "@/models/domain/value_object";

export class UserEntity extends AbsEntity<UserType, UserDTO> {    
    constructor(id: ObjectId, object: UserDTO) {
        super(id, object, UserEntity.schema());
    }
    
    static schema() {
        return z.object({
            channel_id: UserChannelId.schema(),
            name: UserName.schema(),
            avatar: UserAvatar.schema()
        });
    }
}