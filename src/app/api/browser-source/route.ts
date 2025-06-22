import { CookieParseService, CreateHashedIdService } from "@/models/application/service";


export async function GET(request: Request) {
    const url_origin = new URL(request.url).origin
    const user_id = await new CookieParseService().execute(request);
    const hashed_user_id = await new CreateHashedIdService().execute(user_id);

    return Response.json({
        url: `${url_origin}/browser-source?hash=${hashed_user_id}`
    })
}