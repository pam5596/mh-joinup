import AbsValueObject from "../abstruct";
import { z } from "zod";

export class SettingKeyWord extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, SettingKeyWord.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string().min(1).max(10);
    }
}