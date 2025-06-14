import type { SettingType, SettingDTO } from "@/models/domain/entity";

export type GetSettingRequestType = Pick<SettingType, 'user_id'>;

export type GetSettingRequestDTO = Pick<SettingDTO, 'user_id'>;

export type GetSettingResponseType = {
    setting_id: SettingType['id'];
    keywords: SettingType['keywords'];
}

export type GetSettingResponseDTO = {
    setting_id: SettingDTO['id'];
    keywords: SettingDTO['keywords'];
}
