import AbsValueObject from "../abstruct";
import { z } from "zod";

export class UserAvatar extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, UserAvatar.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string().url();
    }
}