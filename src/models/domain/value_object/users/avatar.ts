import AbsValueObject from "../abstruct";
import { z } from "zod";

export class UserAvatar extends AbsValueObject<string> {
    validate(const_val: string): string {
        const schema = z.string().url()
        
        return schema.parse(const_val);
    }
}