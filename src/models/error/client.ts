import AbsError from "./abstruct";

export default class ClientError<DataType> extends AbsError<DataType> {
    constructor(
        message: string,
        code: number = 500
    ) {
        super(message, null, 'client', code);
    }
}