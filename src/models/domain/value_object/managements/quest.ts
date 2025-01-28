import AbsValueObject from "../abstruct";
import { z } from "zod";

export class ManageQuest extends AbsValueObject<number> {
    validate(const_val: number): number {
        const schema = z.number().int().nonnegative();
        
        return schema.parse(const_val);
    }
}