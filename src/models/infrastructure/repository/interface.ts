import { ObjectId } from "mongodb";
import MongoDBClient from "../client/mongodb";

export default interface IfRepository<DTO> {
    client: MongoDBClient;
    insert(data: DTO): Promise<ObjectId|void>;
    selectById(id: ObjectId): Promise<DTO|void>;
    updateById(id: ObjectId, data: DTO): Promise<DTO|void>;
    deleteById(id: ObjectId): Promise<ObjectId|void>;
}