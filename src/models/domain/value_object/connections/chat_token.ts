import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ConnectChatToken extends AbsValueObject<string> {
    validate(const_val: string): string {
        const schema = z.string().length(75).regex(/^[A-Za-z0-9_-]+$/)
        
        return schema.parse(const_val);
    }
}