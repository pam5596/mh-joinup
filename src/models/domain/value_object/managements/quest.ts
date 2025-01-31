import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ManageQuest extends AbsValueObject<number> {
    constructor(value: number) {
        super(value, ManageQuest.schema());
    }
    
    static schema(): z.ZodType<number> {
        return z.number().int().nonnegative();
    }
}