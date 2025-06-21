import MongoDBClient from "@/models/infrastructure/client/mongodb";
import { GetSettingUseCase } from "@/models/application/usecase";
import { CookieParseService } from "@/models/application/service";
import { SettingRepository } from "@/models/infrastructure/repository";
import { GetSettingRequestPayload } from "@/models/application/payload/get_setting";

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