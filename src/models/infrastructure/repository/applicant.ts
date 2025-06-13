import AbsRepository from "./abstruct";
import { RepositoryError } from "@/models/error";

import { ApplicantEntity } from "@/models/domain/entity";
import { ApplicantMessage } from "@/models/domain/value_object";

import { Collection, ObjectId } from "mongodb";
import MongoDBClient from "../client/mongodb";


export default class ApplicantRepository extends AbsRepository<ApplicantEntity> {
    constructor(client: MongoDBClient, collection: Collection) {
        super(client, collection);
    }


    async insert(entity: ApplicantEntity): Promise<void|ObjectId> {
        const result = await this.insertRaw(entity);

        if (!result.acknowledged) {
            throw new RepositoryError(
                `[ApplicantRepository] 挿入に失敗しました`,
                entity.toDocument(),
                500
            )
        }
        return result.insertedId;
    }


    async selectByUserId(user_id: ObjectId): Promise<ApplicantEntity | null> {
        const result = await this.selectByOtherPropsRaw("user_id", user_id);

        if (result) {
            return new ApplicantEntity(
                result._id,
                new ObjectId(result.user_id),
                new ObjectId(result.application_id),
                new ApplicantMessage(result.message),
            );
        } else {
            return null;
        }
    }


    async selectByConnectionId(connection_id: ObjectId): Promise<ApplicantEntity | null> {
        const result = await this.selectByOtherPropsRaw("connection_id", connection_id);

        if (result) {
            return new ApplicantEntity(
                result._id,
                new ObjectId(result.user_id),
                new ObjectId(result.application_id),
                new ApplicantMessage(result.message),
            );
        } else {
            return null;
        }
    }
}