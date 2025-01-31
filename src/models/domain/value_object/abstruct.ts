import { z } from "zod";

export default abstract class AbsValueObject<T> {
    protected readonly _value: T;

    constructor(value: T, schema: z.ZodType<T>) {
        this._value = schema.parse(value);
    }

    get value(): T {
        return this._value;
    }

    equals(other: AbsValueObject<T>): boolean {
        return this._value === other._value;
    }
}