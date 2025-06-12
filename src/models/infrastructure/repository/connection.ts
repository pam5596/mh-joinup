import AbsRepository from "./abstruct";
import { ConnectionEntity} from "@/models/domain/entity";
import { ConnectVideoTitle, ConnectYoutubeId } from "@/models/domain/value_object";

import { Collection, ObjectId } from "mongodb";
import MongoDBClient from "../client/mongodb";


export default class ConnectionRepository extends AbsRepository<ConnectionEntity> {
    constructor(client: MongoDBClient, collection: Collection) {
        super(client, collection);
    }

    async selectByYoutubeId(youtube_id: ConnectYoutubeId): Promise<ConnectionEntity | null> {
        const result = await this.selectByOtherPropsRaw("youtube_id", youtube_id.value);

        if (result) {
            return new ConnectionEntity(
                result._id,
                new ObjectId(result.user_id),
                youtube_id,
                new ConnectVideoTitle(result.video_title),
            );
        } else {
            return null;
        }
    }

    async upsertByYoutubeId(connection: ConnectionEntity) {
        await this.upsertByOtherPropsRaw("youtube_id", connection);
    }
}