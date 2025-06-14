import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ApplicantMessage extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, ApplicantMessage.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string()
            .min(1, { message: '[ApplicantMessage] 文字数は1文字以上です' })
            .max(200, { message: '[ApplicantMessage] 文字数は200文字以下です' });
    }
}