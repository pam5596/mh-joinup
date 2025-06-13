import type { SettingType, SettingDTO } from "@/models/domain/entity";

export type GetSettingResponseType = {
    setting_id: SettingType['id'];
    keywords: SettingType['keywords'];
}

export type GetSettingResponseDTO = {
    setting_id: SettingDTO['id'];
    keywords: SettingDTO['keywords'];
}
