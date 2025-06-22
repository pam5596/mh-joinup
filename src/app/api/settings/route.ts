import { ObjectId } from "mongodb";

import MongoDBClient from "@/models/infrastructure/client/mongodb";
import { CookieParseService } from "@/models/application/service";
import { SettingRepository } from "@/models/infrastructure/repository";

import { GetSettingUseCase, UpdateSettingUseCase } from "@/models/application/usecase";
import { GetSettingRequestPayload } from "@/models/application/payload/get_setting";
import { UpdateSettingRequestPayload, UpdateSettingTypesD } from "@/models/application/payload/update_setting";
import { SettingKeyWord } from "@/models/domain/value_object";

const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI || "");
const collection = mongoDBClient.field(process.env.MONGODB_NAME || '', "settings");
const settingRepository = new SettingRepository(mongoDBClient, collection);


export async function GET(request: Request) {
    const user_id = await new CookieParseService().execute(request);

    const request_payload = new GetSettingRequestPayload(user_id);
    const getSettingUseCase = new GetSettingUseCase(
        request_payload,
        settingRepository
    );

    const response_payload = await getSettingUseCase.execute();

    return Response.json(response_payload.toJson());
}


export async function PUT(request: Request) {
    const user_id = await new CookieParseService().execute(request);
    const body = await request.json() as UpdateSettingTypesD.UpdateSettingRequestType;

    const request_payload = new UpdateSettingRequestPayload(
        new ObjectId(body.setting_id),
        user_id,
        body.keywords.map((keyword) => new SettingKeyWord(keyword))
    );

    const updateSettingUseCase = new UpdateSettingUseCase(
        request_payload,
        settingRepository
    );

    const response_payload = await updateSettingUseCase.execute()

    return Response.json(response_payload.toJson())

}