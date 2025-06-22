import AbsUseCase from "../abstruct";
import { UseCaseError } from "@/models/error";

import { SettingsPayload } from "@/models/application/payload";
import { CookieParseService } from "@/models/application/service";
import { SettingRepository } from "@/models/infrastructure/repository";
import { SettingEntity } from "@/models/domain/entity";
import { SettingKeyWord } from "@/models/domain/value_object";
import { ObjectId } from "mongodb";


export default class SettingsPUTUseCase extends AbsUseCase<SettingsPayload.PUTRequestType, SettingsPayload.PUTResponseType> {
    settingRepository: SettingRepository
    cookieParseService: CookieParseService;

    constructor(
        request: SettingsPayload.PUTRequestType,
        settingRepository: SettingRepository,
        cookieParseService: CookieParseService,
    ){
        super(request)
        this.settingRepository = settingRepository
        this.cookieParseService = cookieParseService
    }

    async execute(): Promise<SettingsPayload.PUTResponseType> {
        const user_id = await this.cookieParseService.execute(this.request)
        const request_body = await this.request.json();

        if (!request_body.setting_id || !request_body.keywords) 
            throw new UseCaseError(
                "setting_idかkeywordsを検出できませんでした。リクエストボディが不正です。",
                request_body,
                400
            )

        const upsert_setting = new SettingEntity(
            new ObjectId(request_body.setting_id),
            new ObjectId(user_id),
            request_body.keywords.map((k: string) => new SettingKeyWord(k))
        );

        const upserted_setting_id = await this.settingRepository.upsertByUserId(upsert_setting);
        return {
            setting_id: upserted_setting_id.toHexString()
        }
    }
}