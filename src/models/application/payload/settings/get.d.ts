import type { SettingType } from "@/models/domain/entity";

export type GETRequestType = Request;

export type GETResponseType = {
    setting_id: SettingType['id'];
    keywords: SettingType['keywords'];
    quest: SettingType['quest']
}