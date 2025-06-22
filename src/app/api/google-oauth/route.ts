import { serialize } from "cookie";

import MongoDBClient from "@/models/infrastructure/client/mongodb";
import { GoogleOauthPayload } from "@/models/application/payload";
import { GoogleOauthGETUseCase, GoogleOauthPOSTUseCase } from "@/models/application/usecase";
import { GetUserIdService, GetChannelInfoService, CookieParseService } from "@/models/application/service";
import { UserRepository } from "@/models/infrastructure/repository";

const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI || "");
const collection = mongoDBClient.field(process.env.MONGODB_NAME || '', "users");
const userRepository = new UserRepository(mongoDBClient, collection);

const getUserIdService = new GetUserIdService(userRepository);
const cookieParseService = new CookieParseService();
const getChannelInfoService = new GetChannelInfoService();


export async function GET(request: Request) {
    const usecase = new GoogleOauthGETUseCase(
        request,
        userRepository,
        cookieParseService,
        getUserIdService,
    );

    const response = await usecase.execute();

    return Response.json(response);
}


export async function POST(request: Request) {
    const request_body = await request.json() as GoogleOauthPayload.POSTRequestType;

    const usecase = new GoogleOauthPOSTUseCase(
        request_body,
        getUserIdService,
        getChannelInfoService
    )
    

    const response = await usecase.execute();

    const user_id_cookie = serialize('user_id', response.user_id, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });

    const auth_token_cookie = serialize('auth_token', response.auth_token, {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });

    const headers = new Headers();
    headers.append('Set-Cookie', user_id_cookie);
    headers.append('Set-Cookie', auth_token_cookie);
    
    return Response.json({
        next_path: '/home'
    },{ headers })
}