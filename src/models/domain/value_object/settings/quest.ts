import AbsValueObject from "../abstruct";
import { z } from "zod";

export class SettingQuest extends AbsValueObject<number> {
    constructor(value: number) {
        super(value, SettingQuest.schema());
    }
    
    static schema(): z.ZodType<number> {
        return z.number()
            .int({ message: '[SettingQuest] 整数値です'})
            .nonnegative({ message: '[SettingQuest] 0以上の値です' })
            .min(1, { message: '[SettingQuest] 1以上の整数値です'});
    }
}