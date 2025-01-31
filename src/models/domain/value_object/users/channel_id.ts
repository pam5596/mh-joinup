import AbsValueObject from "../abstruct";
import { z } from "zod";

export class UserChannelId extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, UserChannelId.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string().length(24).regex(/^[A-Za-z0-9_-]+$/);
    }
}