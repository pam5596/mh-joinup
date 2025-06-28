import errorHandling from "@/utils/errorHandling";

import MongoDBClient from "@/models/infrastructure/client/mongodb";
import { GoogleOauthPayload } from "@/models/application/payload";
import { GoogleOauthGETUseCase, GoogleOauthPOSTUseCase } from "@/models/application/usecase";
import { GetUserIdService, GetChannelInfoService, CookieParseService, ConfirmTokenService } from "@/models/application/service";
import { UserRepository } from "@/models/infrastructure/repository";
import { cookies } from "next/headers";

const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI || "");
const collection = mongoDBClient.field(process.env.MONGODB_NAME || '', "users");
const userRepository = new UserRepository(mongoDBClient, collection);

const getUserIdService = new GetUserIdService(userRepository);
const cookieParseService = new CookieParseService();
const getChannelInfoService = new GetChannelInfoService();
const confirmTokenService = new ConfirmTokenService();


export async function GET(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new GoogleOauthGETUseCase(
            request,
            userRepository,
            cookieParseService,
            getUserIdService,
            confirmTokenService
        );

        const response = await usecase.execute();

        return Response.json(response);
    })
}

export async function POST(request: Request) {
    return errorHandling(request, async (request) => {
        const request_body = await request.json() as GoogleOauthPayload.POSTRequestType;

        const usecase = new GoogleOauthPOSTUseCase(
            request_body,
            getUserIdService,
            getChannelInfoService
        )

        const response = await usecase.execute();

        const cookieStore = await cookies();
        cookieStore.set('user_id', response.user_id, { httpOnly: true, maxAge: 86400 });
        cookieStore.set('auth_token', response.auth_token, { httpOnly: true, maxAge: 86400 });
        
        return Response.json({
            next_path: '/home'
        })
    })
}

export async function DELETE(request: Request) {
    return errorHandling(request, async () => {
        const cookieStore = await cookies();

        cookieStore.delete('user_id')
        cookieStore.delete('auth_token')
        
        return Response.json({ next_path: '/home' })
    })
}