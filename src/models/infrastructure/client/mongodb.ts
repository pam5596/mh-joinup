import { MongoClient, ServerApiVersion } from "mongodb";

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
}