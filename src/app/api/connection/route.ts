import errorHandling from "@/utils/errorHandling";

import MongoDBClient from "@/models/infrastructure/client/mongodb";
import { ConnectionGETUseCase } from "@/models/application/usecase";
import { GetStreamInfoService, CookieParseService, GetConnectionIdService } from "@/models/application/service";
import { ConnectionRepository } from "@/models/infrastructure/repository";

const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI || "");
const connectionCollection = mongoDBClient.field(process.env.MONGODB_NAME || '', "connections");
const connectionRepository = new ConnectionRepository(mongoDBClient, connectionCollection)

const cookieParseService = new CookieParseService();
const getStreamInfoService = new GetStreamInfoService();
const getConnectionIdService = new GetConnectionIdService(connectionRepository)


export async function GET(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new ConnectionGETUseCase(
            request,
            cookieParseService,
            getStreamInfoService,
            getConnectionIdService
        );

        const response = await usecase.execute();

        return Response.json(response);
    })
}