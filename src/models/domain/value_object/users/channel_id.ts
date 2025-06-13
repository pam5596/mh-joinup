import AbsValueObject from "../abstruct";
import { z } from "zod";

export class UserChannelId extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, UserChannelId.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string()
            .length(24, { message: '[UserChannelId] 文字数は24文字固定長です' })
            .regex(/^[A-Za-z0-9_-]+$/, { message: '[UserChannelId] 半角英数字、アンダースコア、ハイフンのみ使用可能です' });
    }
}