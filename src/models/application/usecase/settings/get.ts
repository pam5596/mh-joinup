import AbsUseCase from "../abstruct";

import { SettingsPayload} from "@/models/application/payload";
import { CookieParseService } from "@/models/application/service";
import { SettingRepository } from "@/models/infrastructure/repository";
import { SettingEntity } from "@/models/domain/entity";
import { ObjectId } from "mongodb";


export default class SettingsGETUseCase extends AbsUseCase<SettingsPayload.GETRequestType, SettingsPayload.GETResponseType> {
    settingRepository: SettingRepository
    cookieParseService: CookieParseService;

    constructor(
        request: SettingsPayload.GETRequestType,
        settingRepository: SettingRepository,
        cookieParseService: CookieParseService,
    ){
        super(request)
        this.settingRepository = settingRepository
        this.cookieParseService = cookieParseService
    }

    async execute(): Promise<SettingsPayload.GETResponseType> {
        const { user_id } = await this.cookieParseService.execute(this.request);
        
        const selected_setting = await this.settingRepository.selectByUserId(user_id);
        if (selected_setting) {
            return {
                setting_id: selected_setting.objectId.toHexString(),
                keywords: selected_setting.keywords.map((k) => k.value)
            }
        } else {
            const new_setting = new SettingEntity(
                new ObjectId(),
                user_id,
                []
            )

            const upserted_setting_id = await this.settingRepository.upsertByUserId(new_setting);
            return {
                setting_id: upserted_setting_id.toHexString(),
                keywords: []
            }
        }
    }

}