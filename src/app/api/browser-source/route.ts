import errorHandling from "@/utils/errorHandling";

import MongoDBClient from "@/models/infrastructure/client/mongodb";
import { BrowserSourceGETUseCase, BrowserSourcePOSTUseCase } from "@/models/application/usecase";
import { CookieParseService, CreateHashedIdService } from "@/models/application/service";
import { UserRepository } from "@/models/infrastructure/repository";

const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI || "");
const collection = mongoDBClient.field(process.env.MONGODB_NAME || '', "users");
const userRepository = new UserRepository(mongoDBClient, collection);

const cookieParseService = new CookieParseService();
const createHashedIdService = new CreateHashedIdService();

export async function GET(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new BrowserSourceGETUseCase(
            request,
            userRepository
        );

        const response = await usecase.execute();

        return Response.json(response)
    })
}





export async function POST(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new BrowserSourcePOSTUseCase(
            request,
            userRepository,
            cookieParseService,
            createHashedIdService
        );

        const response = await usecase.execute();

        return Response.json(response);
    })
}