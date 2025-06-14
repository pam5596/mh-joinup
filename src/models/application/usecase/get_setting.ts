import { ObjectId } from "mongodb";

import AbsUseCase from "./abstruct";
import { GetSettingRequestPayload, GetSettingResponsePayload } from "../payload/get_setting";
import { SettingRepository } from "@/models/infrastructure/repository";
import { SettingEntity } from "@/models/domain/entity";


export default class GetSettingUseCase extends AbsUseCase<GetSettingRequestPayload, GetSettingResponsePayload> {
    settingRepository: SettingRepository;

    constructor(
        request: GetSettingRequestPayload, 
        settingRepository: SettingRepository
    ) {
        super(request);
        this.settingRepository = settingRepository;
    }

    async execute(): Promise<GetSettingResponsePayload> {
        const request = this.request.toObject();

        const selected_setting = await this.settingRepository.selectByUserId(request.user_id);

        if (selected_setting) {
            return new GetSettingResponsePayload(
                selected_setting.objectId,
                selected_setting.keywords
            );

        } else {
            const upsert_setting = new SettingEntity(
                new ObjectId(),
                request.user_id,
                []
            )
            const upserted_setting_id = await this.settingRepository.upsertByUserId(upsert_setting) as ObjectId;

            return new GetSettingResponsePayload(
                upserted_setting_id,
                upsert_setting.keywords
            );
        }
    }
}