import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ManageApplicant extends AbsValueObject<number> {
    constructor(value: number) {
        super(value, ManageApplicant.schema());
    }
    
    static schema(): z.ZodType<number> {
        return z.number().int().nonnegative();
    }
}