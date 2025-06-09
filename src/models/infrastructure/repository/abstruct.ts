import { Collection, ObjectId } from "mongodb";
import MongoDBClient from "../client/mongodb";
import AbsEntity from "@/models/domain/entity/abstruct";


export default abstract class AbsRepository<Entitiy extends AbsEntity<unknown, unknown>> {
    private client: MongoDBClient;
    private collection: Collection;

    constructor(client: MongoDBClient, collection: Collection) {
        this.client = client;
        this.collection = collection;
    }

    private async queryWrapper<QueryT, ReturnT>(
        query: QueryT,
        callback: (query: QueryT) => Promise<ReturnT>
    ): Promise<ReturnT> {
        await this.client.connect();
        const result = await callback(query);
        await this.client.close();

        return result;
    }

    protected async insertRaw(data: Entitiy) {
        return await this.queryWrapper(data,
            async(data: Entitiy) => await this.collection.insertOne(data.toDocument())
        )
    }

    protected async selectByIdRaw(id: ObjectId) {
        return await this.queryWrapper(id,
            async(id: ObjectId) => await this.collection.findOne({ _id: id })
        )
    }

    protected async updateRaw(data: Entitiy) {
        return await this.queryWrapper(data,
            async (data: Entitiy) => {
                const { _id, ...otherProps } = data.toDocument(); 
                return await this.collection.updateOne(
                    { _id },
                    { $set: otherProps }
                )
            }
        )
    }

    protected async deleteByIdRaw(id: ObjectId) {
        return await this.queryWrapper(id,
            async(id: ObjectId) => await this.collection.deleteOne({ _id: id })
        )
    }
}