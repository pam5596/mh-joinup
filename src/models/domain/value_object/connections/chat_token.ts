import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ConnectChatToken extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, ConnectChatToken.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string().length(75).regex(/^[A-Za-z0-9_-]+$/);
    }
}