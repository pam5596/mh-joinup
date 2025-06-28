import AbsUseCase from "../abstruct";
import { UseCaseError } from "@/models/error";

import { BrowserSourcePayload } from "../../payload";
import { CookieParseService, CreateHashedIdService } from "@/models/application/service";
import { UserRepository } from "@/models/infrastructure/repository";


export default class BrowserSourcePOSTUseCase extends AbsUseCase<BrowserSourcePayload.POSTRequestType, BrowserSourcePayload.POSTResponseType> {
    userRepository: UserRepository
    cookieParseService: CookieParseService;
    createHashedIdService: CreateHashedIdService;


    constructor(
        request: Request,
        userRepository: UserRepository,
        cookieParseService: CookieParseService,
        createHashedIdService: CreateHashedIdService
    ) {
        super(request)
        this.userRepository = userRepository
        this.cookieParseService = cookieParseService
        this.createHashedIdService = createHashedIdService
    }

    async execute(): Promise<BrowserSourcePayload.POSTResponseType> {
        const url_origin = new URL(this.request.url).origin;
        const { user_id } = await this.cookieParseService.execute(this.request)

        const hashed_user_id = await this.createHashedIdService.execute(user_id)

        const selected_user = await this.userRepository.selectById(user_id);

        if (!selected_user) throw new UseCaseError(
            'ユーザが見つかりませんでした。ログインし直してください。',
            this.request.url,
            404
        )

        return {
            url: `${url_origin}/browser-source?hash=${hashed_user_id}&channel=${selected_user.channel_id.value}`
        }
    }
}