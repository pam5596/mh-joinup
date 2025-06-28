import errorHandling from "@/utils/errorHandling";

import MongoDBClient from "@/models/infrastructure/client/mongodb";
import { ManagementPayload } from "@/models/application/payload";
import { ManagementGETUseCase, ManagementPOSTUseCase, ManagementPUTUseCase } from "@/models/application/usecase";
import { CookieParseService, CreateHashedIdService } from "@/models/application/service";
import { ManagementRepository } from "@/models/infrastructure/repository";

const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI || "");
const collection = mongoDBClient.field(process.env.MONGODB_NAME || '', "managements");
const managementRepository = new ManagementRepository(mongoDBClient, collection);

const cookieParseService = new CookieParseService();
const createHashedIdService = new CreateHashedIdService();


export async function GET(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new ManagementGETUseCase(
            request,
            managementRepository
        );

        const response = await usecase.execute();

        return Response.json(response);
    })
}


export async function POST(request: Request) {
    return errorHandling(request, async (request) => {
        const request_body = await request.json() as ManagementPayload.POSTRequestType;

        const usecase = new ManagementPOSTUseCase(
            request_body,
            managementRepository
        )
        const response = await usecase.execute();

        return Response.json(response);
    })
}


export async function PUT(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new ManagementPUTUseCase(
            request,
            cookieParseService,
            createHashedIdService
        );

        const response = await usecase.execute();

        return Response.json(response);
    })
}