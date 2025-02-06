import { ObjectId } from "mongodb";
import { z } from "zod";

export class MongoId extends ObjectId {
    constructor(id: string) {
        super(MongoId.schema().parse(id));
    }

    static schema(): z.ZodType<string> {
        return z.string().cuid2().length(24);
    }
}