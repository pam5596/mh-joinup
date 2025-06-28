import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ConnectVideoTitle extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, ConnectVideoTitle.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string()
            .min(1, { message: '[ConnectVideoTitle] 文字数は1文字以上です' })
            .max(100, { message: '[ConnectVideoTitle] 文字数は100文字以下です' });
    }
}