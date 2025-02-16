import { z } from "zod";

export default abstract class AbsEmbedded<T, DTO> {
    protected readonly _values: T;

    constructor(values: T, schema: z.ZodObject<z.ZodRawShape>) {
        this._values = schema.parse(values) as T;
    }

    toJson(): T {
        return this._values;
    }

    abstract toObject(): DTO

    equals(other: AbsEmbedded<T, DTO>): boolean {
        return JSON.stringify(this._values) === JSON.stringify(other._values);
    }
}