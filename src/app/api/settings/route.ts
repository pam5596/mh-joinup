import errorHandling from "@/utils/errorHandling";

import MongoDBClient from "@/models/infrastructure/client/mongodb";
import { CookieParseService } from "@/models/application/service";
import { SettingRepository } from "@/models/infrastructure/repository";

import { SettingsGETUseCase, SettingsPUTUseCase } from "@/models/application/usecase";

const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI || "");
const collection = mongoDBClient.field(process.env.MONGODB_NAME || '', "settings");
const settingRepository = new SettingRepository(mongoDBClient, collection);

const cookieParseService = new CookieParseService();


export async function GET(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new SettingsGETUseCase(
            request,
            settingRepository,
            cookieParseService
        );

        const response = await usecase.execute();

        return Response.json(response);
    });
}


export async function PUT(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new SettingsPUTUseCase(
            request,
            settingRepository,
            cookieParseService
        );

        const response = await usecase.execute();

        return Response.json(response);
    });
}