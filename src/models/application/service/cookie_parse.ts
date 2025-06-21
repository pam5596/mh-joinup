import { ObjectId } from "mongodb";
import { parse } from "cookie";

import AbsService from "./abstruct";
import { ServiceError } from "@/models/error";


export default class CookieParseService extends AbsService<Request, ObjectId> {
    async execute(request: Request): Promise<ObjectId> {
        const cookie = request.headers.get("cookie");
        if (!cookie) throw new ServiceError(
            "ログインに失敗しました。再度ログインし直してください。",
            request,
            401
        )

        const parsed_cookie = parse(cookie);
    
        const userId = parsed_cookie.user_id;
        if (!userId) throw new ServiceError(
            "ログインに失敗しました。再度ログインし直してください。",
            request,
            400
        );

        return new ObjectId(userId);
    }
}