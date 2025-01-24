import AbsValueObject from "../abstruct";
import { z } from "zod";

export class UserName extends AbsValueObject<string> {
    validate(const_val: string): string {
        const schema = z.string().min(1)
        
        return schema.parse(const_val);
    }
}