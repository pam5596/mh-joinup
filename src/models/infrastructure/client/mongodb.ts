import { MongoClient, ServerApiVersion } from "mongodb";
import { ClientError } from "@/models/error";

export default class MongoDBClient extends MongoClient {
    constructor(uri: string) {
        super(uri,
            {   
                serverApi: ServerApiVersion.v1,
            }
        );
    }

    field(db_name: string, collection_name: string) {
        return this.db(db_name).collection(collection_name);
    }

    async queryWrapper<QueryT, ReturnT>(
        query: QueryT,
        callback: (query: QueryT) => Promise<ReturnT>
    ): Promise<ReturnT> {
        try {
            await this.connect();
        } catch (error) {
            if (error instanceof Error) {
                throw new ClientError(
                    `[MongoDBClient] ${error.message}`, 503
                );
            } else {
                throw new ClientError(
                    "[MongoDBClient] MongoDBの接続に失敗しました", 503
                )
            }
        }

        const result = await callback(query);
        return result;
    };
}
