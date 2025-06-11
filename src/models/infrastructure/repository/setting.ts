import AbsRepository from "./abstruct";
import { SettingEntity } from "@/models/domain/entity";
import { SettingKeyWord } from "@/models/domain/value_object";

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
                result.keywords.map((keyword: string) => new SettingKeyWord(keyword))
            );
        } else {
            return null;
        }
    }

    async upsertByUserId(setting: SettingEntity): Promise<void> {
        await this.upsertByOtherPropsRaw("user_id", setting);
    }
}