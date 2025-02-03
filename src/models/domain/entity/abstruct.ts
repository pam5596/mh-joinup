import { z } from "zod";
import { ObjectId } from "mongodb";

export default abstract class AbsEntity<T, DTO> {
    protected readonly _id: ObjectId;
    protected readonly _values: T;

    constructor(id: ObjectId, values: T, schema: z.ZodType<T>) {
        this._id = id;
        this._values = schema.parse(values);
    }

    get id(): ObjectId {
        return this._id;
    }

    toJson(): T & { id: string } {
        return {
            id: this._id.toHexString(),
            ...this._values
        }
    }

    abstract toObject(): DTO & { id: ObjectId };

    equals(other: AbsEntity<T, DTO>): boolean {
        return this._id.equals(other._id);
    }
}