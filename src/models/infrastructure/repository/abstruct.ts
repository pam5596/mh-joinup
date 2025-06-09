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

    protected async selectByOtherPropsRaw(props: string, search: unknown) {
        return await this.queryWrapper({props: search},
            async({props: search}) => await this.collection.findOne({ [props]: search })
        )
    }

    protected async upsertByIdRaw(data: Entitiy) {
        return await this.queryWrapper(data,
            async (data: Entitiy) => {
                const { _id, ...otherProps } = data.toDocument(); 
                return await this.collection.updateOne(
                    { _id },
                    { $set: otherProps },
                    { upsert: true }
                )
            }
        )
    }

    protected async upsertByOtherPropsRaw(props: string, data: Entitiy) {
        return await this.queryWrapper({props: data},
            async ({props: data}) => {
                const document = data.toDocument() as Record<string, unknown>;
                const filter = document[props] ? { [props]: document[props] } : { _id: document._id as ObjectId };
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { _ , ...otherProps } = document;

                return await this.collection.updateOne(
                    filter,
                    { $set: otherProps },
                    { upsert: true }
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