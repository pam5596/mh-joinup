import AbsError from "./abstruct";

export default class ValueObjectError<DataType> extends AbsError<DataType> {
    constructor(
        message: string,
        data: DataType | null = null,
        code: number = 400
    ) {
        super(message, data, 'valueObject', code);
    }
}