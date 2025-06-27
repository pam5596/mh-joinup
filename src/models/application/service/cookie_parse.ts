import { ObjectId } from "mongodb";
import { parse } from "cookie";

import AbsService from "./abstruct";
import { ServiceError } from "@/models/error";


export default class CookieParseService extends AbsService<Request, {user_id: ObjectId, auth_token: string}> {
    async execute(request: Request): Promise<{user_id: ObjectId, auth_token: string}> {
        const cookie = request.headers.get("cookie");
        if (!cookie) throw new ServiceError(
            "リクエストヘッダーにcookieが含まれていません。",
            request,
            401
        )

        const parsed_cookie = parse(cookie);
    
        const user_id = parsed_cookie.user_id;
        if (!user_id) throw new ServiceError(
            "UserIdがcookieに含まれていません。",
            parsed_cookie,
            400
        );

        const auth_token = parsed_cookie.auth_token;
        if (!auth_token) throw new ServiceError(
            "AuthTokenがcookieに含まれていません。",
            parsed_cookie,
            400
        )

        return {
            user_id: new ObjectId(user_id),
            auth_token: auth_token
        }
    }
}