import { z } from "zod";
import { ObjectId } from "mongodb";

export default abstract class AbsEntity<T, DTO> {
    protected readonly _id: ObjectId;
    protected _values: Omit<T, 'id'>;

    constructor(id: ObjectId, values: Omit<T, 'id'>, schema: z.ZodObject<z.ZodRawShape>) {
        this._id = id;
        this._values = schema.parse(values) as Omit<T, 'id'>;
    }

    get objectId(): ObjectId {
        return this._id;
    }

    get stringId(): string {
        return this._id.toString();
    }

    get createdAt(): Date {
        return this._id.getTimestamp();
    }

    toJson(): T {
        return {
            id: this._id.toString(),
            ...this._values
        } as T;
    }

    abstract toObject(): DTO

    equals(other: AbsEntity<T, DTO>): boolean {
        return this._id.equals(other._id);
    }
}