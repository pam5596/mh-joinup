import errorHandling from "@/utils/errorHandling";

import MongoDBClient from "@/models/infrastructure/client/mongodb";
import { ManagementPayload } from "@/models/application/payload";
import { ManagementGETUseCase, ManagementPOSTUseCase } from "@/models/application/usecase";
import { ManagementRepository } from "@/models/infrastructure/repository";

const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI || "");
const collection = mongoDBClient.field(process.env.MONGODB_NAME || '', "managements");
const managementRepository = new ManagementRepository(mongoDBClient, collection);

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