import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ConnectYoutubeId extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, ConnectYoutubeId.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string()
            .length(11, { message: '[ConnectYoutubeId] 文字数は11文字固定長です'})
            .regex(/^[A-Za-z0-9_-]+$/, { message: '[ConnectYoutubeId] 半角英数字、アンダースコア、ハイフンのみ使用可能です' });
    }
}