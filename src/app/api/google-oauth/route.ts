import { TokenResponse } from "@react-oauth/google";
import { serialize } from "cookie";

import { GetUserUseCase, GoogleOAuthUseCase } from "@/models/application/usecase";
import { GetUserIdService, GetChannelInfoService, CookieParseService } from "@/models/application/service";
import { UserRepository } from "@/models/infrastructure/repository";
import { GetUserRequestPayload } from "@/models/application/payload/get_user";
import MongoDBClient from "@/models/infrastructure/client/mongodb";

const mongoDBClient = new MongoDBClient(process.env.MONGODB_URI || "");
const collection = mongoDBClient.field(process.env.MONGODB_NAME || '', "users");
const userRepository = new UserRepository(mongoDBClient, collection);

export async function GET(request: Request) {
    const user_id = await new CookieParseService().execute(request);

    const request_payload = new GetUserRequestPayload(user_id);
    const getUserUseCase = new GetUserUseCase(
        request_payload,
        userRepository
    );

    const response_payload = await getUserUseCase.execute();

    return Response.json(response_payload.toJson())
}


export async function POST(request: Request) {
    const body = await request.json() as TokenResponse;
    
    const googleOauthUseCase = new GoogleOAuthUseCase(
        body,
        new GetUserIdService(userRepository),
        new GetChannelInfoService()
    )

    const response = await googleOauthUseCase.execute();

    const cookie = serialize('user_id', response.toHexString(), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });
    
    return Response.json({
        next_path: '/home'
    },{
        headers: {
            'Set-Cookie': cookie
        }
    })
}