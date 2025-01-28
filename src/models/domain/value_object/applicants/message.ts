import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ApplicantMessage extends AbsValueObject<string> {
    validate(const_val: string): string {
        const schema = z.string().min(1).max(200);
        
        return schema.parse(const_val);
    }
}