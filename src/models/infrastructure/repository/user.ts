import AbsRepository from "./abstruct";
import { RepositoryError } from "@/models/error";

import { UserEntity } from "@/models/domain/entity";
import { UserChannelId, UserAvatar, UserName } from "@/models/domain/value_object";

import { Collection, ObjectId } from "mongodb";
import MongoDBClient from "../client/mongodb";


export default class UserRepository extends AbsRepository<UserEntity> {
    constructor(client: MongoDBClient, collection: Collection) {
        super(client, collection);
    }

    async selectByChannelId(channel_id: ObjectId): Promise<UserEntity | null> {
        const result = await this.selectByOtherPropsRaw("channel_id", channel_id);
        
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

    async upsertByChannelId(user: UserEntity): Promise<void|ObjectId> {
        const result = await this.upsertByOtherPropsRaw("channel_id", user);

        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            throw new RepositoryError(
                '[UserRepository] ChannelIDでのアップサートに失敗しました',
                user.toDocument(),
                500
            );
        }

        if (result.upsertedId) return result.upsertedId;
    }
}