import MongoDBClient from "@/models/infrastructure/client/mongodb";
import { ApplicantPayload } from "@/models/application/payload";
import { ApplicantPOSTUseCase } from "@/models/application/usecase";
import { GetUserIdService } from "@/models/application/service";
import { ApplicantRepository, UserRepository } from "@/models/infrastructure/repository";

const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI || "");
const applicantRepository = new ApplicantRepository(mongoDBClient, mongoDBClient.field(process.env.MONGODB_NAME || '', 'applicants'));
const userRepository = new UserRepository(mongoDBClient, mongoDBClient.field(process.env.MONGODB_NAME || '', 'users'));

const getUserIdService = new GetUserIdService(userRepository);


export async function POST(request: Request) {
    const request_body = await request.json() as ApplicantPayload.POSTRequestType;

    const usecase = new ApplicantPOSTUseCase(
        request_body,
        applicantRepository,
        getUserIdService
    );

    const response = await usecase.execute();

    return Response.json(response);
}