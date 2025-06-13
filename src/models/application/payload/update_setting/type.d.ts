import type { SettingType, SettingDTO } from "@/models/domain/entity";

export type UpdateSettingRequestType = {
    setting_id: SettingType['id'];
    keywords: SettingType['keywords'];
}

export type UpdateSettingResponseType = {
    setting_id: SettingType['id'];
}

export type UpdateSettingRequestDTO = {
    setting_id: SettingDTO['id'];
    keywords: SettingDTO['keywords'];
}

export type UpdateSettingResponseDTO = {
    setting_id: SettingDTO['id'];
}