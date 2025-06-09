import AbsRepository from "./abstruct";
import { UserEntity } from "@/models/domain/entity";
import { UserChannelId, UserAvatar, UserName } from "@/models/domain/value_object";

import { Collection, ObjectId } from "mongodb";
import MongoDBClient from "../client/mongodb";


export default class UserRepository extends AbsRepository<UserEntity> {
    constructor(client: MongoDBClient, collection: Collection) {
        super(client, collection);
    }

    async insert(user: UserEntity): Promise<ObjectId> {
        const result = await this.insertRaw(user);
        return result.insertedId
    }

    async selectById(id: ObjectId): Promise<UserEntity | null> {
        const result = await this.selectByIdRaw(id);
        
        if (result) {
            return new UserEntity(
                result._id,
                new UserChannelId(result.channelId),
                new UserName(result.name),
                new UserAvatar(result.avatar)
            );
        } else {
            return null;
        }
    }

    async upsertByChannelId(user: UserEntity): Promise<void> {
        await this.upsertByOtherPropsRaw("channel_id", user);
    }
}