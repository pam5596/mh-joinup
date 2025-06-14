import { z } from "zod";
import { ValueObjectError } from "@/models/error";

export default abstract class AbsValueObject<T> {
    protected readonly _value: T;

    constructor(value: T, schema: z.ZodType<T>) {
        try {
            this._value = schema.parse(value);
        } catch (error) {
            if (error instanceof Error) {
                throw new ValueObjectError<T>(error.message, value);
            } else {
                throw new ValueObjectError<T>('不明なエラーが発生しました', value, 500);
            }
        }
    }

    get value(): T {
        return this._value;
    }

    equals(other: AbsValueObject<T>): boolean {
        return this._value === other._value;
    }
}