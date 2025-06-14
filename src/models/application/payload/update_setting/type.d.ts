import type { SettingType, SettingDTO } from "@/models/domain/entity";

export type UpdateSettingRequestType = {
    setting_id: SettingType['id'];
    user_id: SettingType['user_id'];
    keywords: SettingType['keywords'];
}

export type UpdateSettingResponseType = {
    setting_id: SettingType['id'];
}

export type UpdateSettingRequestDTO = {
    setting_id: SettingDTO['id'];
    user_id: SettingDTO['user_id'];
    keywords: SettingDTO['keywords'];
}

export type UpdateSettingResponseDTO = {
    setting_id: SettingDTO['id'];
}