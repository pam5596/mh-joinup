import type { SettingKeyWord } from "@/models/domain/value_object";
import { ObjectId } from "mongodb";

export type SettingType = {
    id: string;
    user_id: string;
    keywords: string[];
}

export type SettingDTO = {
    id: ObjectId;
    user_id: ObjectId;
    keywords: SettingKeyWord[];
}