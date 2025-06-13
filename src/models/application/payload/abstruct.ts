import { z } from "zod";

export default abstract class AbsPayload<T, DTO> {
    protected _values: T;

    constructor(values: T, schema: z.ZodObject<z.ZodRawShape>) {
        this._values = schema.parse(values) as T;
    }

    toJson(): T {
        return this._values;
    }

    abstract toObject(): DTO;
}