export default abstract class AbsError<DataType> extends Error {
    public readonly message: string;
    public readonly data: DataType | null;
    public readonly level: 'valueObject' | 'entity' | 'service' | 'repository' | 'usecase'
    public readonly code: number = 500;

    constructor(
        message: string,
        data: DataType | null = null,
        level: 'valueObject' | 'entity' | 'service' | 'repository' | 'usecase',
        code: number = 500,
    ) {
        super(message);
        this.message = message;
        this.data = data;
        this.level = level;
        this.code = code;
    }
}