import type { SettingType } from "@/models/domain/entity";

export type PUTRequestType = Request;

export type PUTResponseType = {
    setting_id: SettingType['id'];
}