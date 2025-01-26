import AbsValueObject from "../abstruct";
import { z } from "zod";

export class SettingKeyWord extends AbsValueObject<string> {
    validate(const_val: string): string {
        const schema = z.string().min(1).max(10);
        
        return schema.parse(const_val);
    }
}