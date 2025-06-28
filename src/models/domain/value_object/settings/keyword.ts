import AbsValueObject from "../abstruct";
import { z } from "zod";

export class SettingKeyWord extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, SettingKeyWord.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string()
            .min(1, { message: '[SettingKeyWord] 文字数は1文字以上です'})
            .max(10, { message: '[SettingKeyWord] 文字数は10文字以下です' });
    }
}