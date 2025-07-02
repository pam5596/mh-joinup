import AbsValueObject from "../abstruct";
import { z } from "zod";

export class SettingCalendarId extends AbsValueObject<string> {
    constructor(value: string) {
        super(value, SettingCalendarId.schema());
    }
    
    static schema(): z.ZodType<string> {
        return z.string()
            .length(90, { message: '[SettingCalendarId] 文字数は90文字固定長です'})
            .endsWith('@group.calendar.google.com', { message: '[SettingCalendarId] グループカレンダーである必要があります'})
            .email({ message: '[SettingCalendarId] Email形式ではありません。'})
    }
}