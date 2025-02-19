import { Collection, ObjectId } from "mongodb";
import MongoDBClient from "../client/mongodb";
import AbsEntity from "@/models/domain/entity/abstruct";


export default abstract class AbsRepository<T, DTO> {
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

    async insert(data: AbsEntity<T, DTO>) {
        return await this.queryWrapper(data,
            async(data: AbsEntity<T, DTO>) => await this.collection.insertOne(data.toDocument())
        )
    }

    async selectById(id: ObjectId) {
        return await this.queryWrapper(id,
            async(id: ObjectId) => await this.collection.findOne({ _id: id })
        )
    }

    async update(data: AbsEntity<T, DTO>) {
        return await this.queryWrapper(data,
            async (data: AbsEntity<T, DTO>) => {
                const { _id, ...otherProps } = data.toDocument(); 
                return await this.collection.updateOne(
                    { _id },
                    { $set: otherProps }
                )
            }
        )
    }

    async deleteById(id: ObjectId) {
        return await this.queryWrapper(id,
            async(id: ObjectId) => await this.collection.deleteOne({ _id: id })
        )
    }
}