import AbsRepository from "./abstruct";
import { UserEntity } from "@/models/domain/entity";
import { MongoId, UserChannelId, UserAvatar, UserName } from "@/models/domain/value_object";

import { Collection, ObjectId } from "mongodb";
import MongoDBClient from "../client/mongodb";


export default class UserRepository extends AbsRepository<UserEntity> {
    constructor(client: MongoDBClient, collection: Collection) {
        super(client, collection);
    }

    async insert(user: UserEntity): Promise<MongoId> {
        const result = await this.insertRaw(user);
        return new MongoId(result.insertedId.toHexString());
    }

    async selectById(id: MongoId): Promise<UserEntity | null> {
        const objectId = new ObjectId(id.toHexString());
        const result = await this.selectByIdRaw(objectId);
        
        if (result) {
            return new UserEntity(
                new MongoId(result._id.toHexString()),
                new UserChannelId(result.channelId),
                new UserName(result.name),
                new UserAvatar(result.avatar)
            );
        } else {
            return null;
        }
    }

    async update(user: UserEntity): Promise<void> {
        await this.updateRaw(user);
    }
}