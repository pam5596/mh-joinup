import AbsValueObject from "../abstruct";
import { z } from "zod";

export class UserName extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, UserName.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string().min(1);
    }
}