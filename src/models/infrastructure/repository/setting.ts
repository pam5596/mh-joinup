import AbsRepository from "./abstruct";
import { RepositoryError } from "@/models/error";

import { SettingEntity } from "@/models/domain/entity";
import { SettingKeyWord, SettingQuest } from "@/models/domain/value_object";

import { Collection, ObjectId } from "mongodb";
import MongoDBClient from "../client/mongodb";


export default class SettingRepository extends AbsRepository<SettingEntity> {
    constructor(client: MongoDBClient, collection: Collection) {
        super(client, collection);
    }
    
    async selectByUserId(user_id: ObjectId): Promise<SettingEntity | null> {
        const result = await this.selectByOtherPropsRaw("user_id", user_id.toHexString());

        if (result) {
            return new SettingEntity(
                result._id,
                user_id,
                result.keywords.map((keyword: string) => new SettingKeyWord(keyword)),
                new SettingQuest(result.quest)
            );
        } else {
            return null;
        }
    }

    async upsertByUserId(setting: SettingEntity): Promise<ObjectId> {
        const result = await this.upsertByOtherPropsRaw("user_id", setting);

        if (result.matchedCount === 0 && result.upsertedCount === 0) {
            throw new RepositoryError(
                '[SettingRepository] UserIDでのアップサートに失敗しました',
                setting.toDocument(),
                500
            );
        }

        return result.upsertedId || setting.objectId;
    }
}