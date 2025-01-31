import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ConnectYoutubeId extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, ConnectYoutubeId.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string().length(11).regex(/^[A-Za-z0-9_-]+$/);
    }
}