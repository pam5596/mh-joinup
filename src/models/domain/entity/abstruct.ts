import { z } from "zod";
import { ObjectId } from "mongodb";

export default abstract class AbsEntity<T, DTO> {
    protected readonly _id: ObjectId;
    protected readonly _object: T;

    constructor(id: ObjectId, object: T, schema: z.ZodType<T>) {
        this._id = id;
        this._object = schema.parse(object);
    }

    get id(): ObjectId {
        return this._id;
    }

    toJson(): T & { id: string } {
        return {
            id: this._id.toHexString(),
            ...this._object
        }
    }

    abstract toObject(): DTO & { id: ObjectId };

    equals(other: AbsEntity<T, DTO>): boolean {
        return this._id.equals(other._id);
    }
}