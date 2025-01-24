export default abstract class AbsValueObject<T> {
    private readonly _value: T;

    constructor(value: T) {
        this._value = this.validate(value);
    }

    abstract validate(const_val: T): T;

    get value(): T {
        return this._value;
    }

    equals(other: AbsValueObject<T>): boolean {
        return this.value === other.value;
    }
}