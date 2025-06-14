import { ObjectId } from "mongodb";

import AbsUseCase from "./abstruct";

import { UpdateSettingRequestPayload, UpdateSettingResponsePayload } from "../payload";
import { SettingRepository } from "@/models/infrastructure/repository";
import { SettingEntity } from "@/models/domain/entity";

export default class UpdateSettingUseCase extends AbsUseCase<UpdateSettingRequestPayload, UpdateSettingResponsePayload> {
    settingRepository: SettingRepository;

    constructor(
        request: UpdateSettingRequestPayload, 
        settingRepository: SettingRepository
    ) {
        super(request);
        this.settingRepository = settingRepository;
    }

    async execute(): Promise<UpdateSettingResponsePayload> {
        const request = this.request.toObject();

        const upsert_setting = new SettingEntity(
            request.setting_id,
            request.user_id,
            request.keywords
        )

        const upserted_setting_id = await this.settingRepository.upsertByUserId(upsert_setting) as ObjectId;
        
        return new UpdateSettingResponsePayload(
            upserted_setting_id
        );
    }
}