import AbsUseCase from "../abstruct";

import { BrowserSourcePayload } from "../../payload";
import { CookieParseService, CreateHashedIdService } from "@/models/application/service";


export default class BrowserSourceGETUseCase extends AbsUseCase<BrowserSourcePayload.GETRequestType, BrowserSourcePayload.GETResponseType> {
    cookieParseService: CookieParseService;
    createHashedIdService: CreateHashedIdService;

    constructor(
        request: Request,
        cookieParseService: CookieParseService,
        createHashedIdService: CreateHashedIdService
    ) {
        super(request)
        this.cookieParseService = cookieParseService
        this.createHashedIdService = createHashedIdService
    }

    async execute(): Promise<BrowserSourcePayload.GETResponseType> {
        const url_origin = new URL(this.request.url).origin;
        const user_id = await this.cookieParseService.execute(this.request)
        const hashed_user_id = await this.createHashedIdService.execute(user_id)

        return {
            url: `${url_origin}/browser-source?hash=${hashed_user_id}`
        }
    }
}