
import MongoDBClient from "@/models/infrastructure/client/mongodb";
import { ConnectionGETUseCase } from "@/models/application/usecase";
import { GetStreamInfoService, CookieParseService } from "@/models/application/service";
import { UserRepository } from "@/models/infrastructure/repository";

const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI || "");
const collection = mongoDBClient.field(process.env.MONGODB_NAME || '', "users");
const userRepository = new UserRepository(mongoDBClient, collection);

const cookieParseService = new CookieParseService();
const getStreamInfoService = new GetStreamInfoService();


export async function GET(request: Request) {
    const usecase = new ConnectionGETUseCase(
        request,
        userRepository,
        cookieParseService,
        getStreamInfoService
    );

    const response = await usecase.execute()

    return Response.json(response)
}