import AbsRepository from "./abstruct";
import { RepositoryError } from "@/models/error";

import { ManageEntity } from "@/models/domain/entity";
import { ManageInstant } from "@/models/domain/embedded";
import { ManageInstantType } from "@/models/domain/embedded/managements/instant/type";
import { ApplicantMessage, ManageApplicant, ManageQuest, UserAvatar, UserName } from "@/models/domain/value_object";

import { Collection, ObjectId } from "mongodb";
import MongoDBClient from "../client/mongodb";


export default class ManagementRepository extends AbsRepository<ManageEntity> {
    constructor(client: MongoDBClient, collection: Collection) {
        super(client, collection);
    }


    async insert(entity: ManageEntity): Promise<ObjectId> {
        const result = await this.insertRaw(entity);

        if (!result.acknowledged) {
            throw new RepositoryError(
                `[ManagementRepository] 挿入に失敗しました`,
                entity.toDocument(),
                500
            )
        }
        return result.insertedId;
    }


    async selectAllByConnectionId(connection_id: ObjectId): Promise<ManageEntity[]|null> {
        const find_result = await this.selectAllByOtherPropsRaw('connection_id', connection_id);

        const result = [];

        for await (const result_manage of find_result) {
            result.push(
                new ManageEntity(
                    result_manage._id,
                    result_manage.connection_id,
                    result_manage.joiner.map(
                        (joiner: ManageInstantType) => 
                            new ManageInstant(
                                new ObjectId(joiner.user_id),
                                new ObjectId(joiner.applicant_id),
                                new UserName(joiner.name),
                                new UserAvatar(joiner.avatar),
                                new ApplicantMessage(joiner.message),
                                new ManageQuest(joiner.quest)
                            )
                    ),
                    result_manage.waiter.map(
                        (waiter: ManageInstantType) => 
                            new ManageInstant(
                                new ObjectId(waiter.user_id),
                                new ObjectId(waiter.applicant_id),
                                new UserName(waiter.name),
                                new UserAvatar(waiter.avatar),
                                new ApplicantMessage(waiter.message),
                                new ManageQuest(waiter.quest)
                            )
                    ),
                    new ManageQuest(result_manage.quests),
                    new ManageApplicant(result_manage.applicants)
                )
            )
        }
        
        return result.length ? result : null;
    }
}