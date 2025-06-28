import AbsService from "./abstruct";
import { ObjectId } from "mongodb";
import { ConnectionRepository } from "@/models/infrastructure/repository";
import { ConnectionEntity } from "@/models/domain/entity";


export default class GetConnectionIdService extends AbsService<ConnectionEntity, ObjectId> {
    readonly repository: ConnectionRepository;

    constructor(repository: ConnectionRepository) {
        super();
        this.repository = repository
    } 

    async execute(request: ConnectionEntity): Promise<ObjectId> {
        const selected_connection = await this.repository.selectByYoutubeId(request.youtube_id);

        if (selected_connection) {
            return selected_connection.objectId;
        } else {
            return await this.repository.upsertByYoutubeId(request);
        }
    }
}