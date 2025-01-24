export interface AbsValueObject<T> {
    get value(): T;
    equals(other: AbsValueObject<T>): boolean;
}