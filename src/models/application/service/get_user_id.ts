import { ObjectId } from "mongodb";

import AbsService from "./abstruct";
import { UserRepository } from "@/models/infrastructure/repository";
import { UserEntity } from "@/models/domain/entity";

export default class GetUserIdService extends AbsService<UserEntity, ObjectId> {
    readonly repository: UserRepository;

    constructor(repository: UserRepository) {
        super();
        this.repository = repository;
    }

    async execute(request: UserEntity): Promise<ObjectId> {
        const selected_user = await this.repository.selectByChannelId(request.channel_id);

        if (selected_user) {
            return selected_user.objectId;
        } else {
            return await this.repository.upsertByChannelId(request) as ObjectId;
        }
    }
}