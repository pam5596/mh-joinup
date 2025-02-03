import { z } from "zod";
import { ObjectId } from "mongodb";

import AbsValueObject from "@/models/domain/value_object/abstruct";

export default abstract class AbsEntity<T, DTO> {
    protected readonly _id: ObjectId;
    protected readonly _objects: Record<string, AbsValueObject<unknown>>;
    protected readonly _values: T;

    constructor(id: ObjectId, objects: Record<string, AbsValueObject<unknown>>, schema: z.ZodType<T>) {
        this._id = id;
        this._objects = objects
        this._values = schema.parse(
            Object.fromEntries(
                Object.entries(objects).map(([_, valueObj]) => [_, valueObj.value])
            )
        );
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