import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ApplicantMessage extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, ApplicantMessage.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string().min(1).max(200);
    }
}