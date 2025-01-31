import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ConnectVideoTitle extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, ConnectVideoTitle.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string().min(1).max(100);
    }
}