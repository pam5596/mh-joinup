import AbsUseCase from "../abstruct";
import { UseCaseError } from "@/models/error";

import { GoogleOauthPayload } from "@/models/application/payload";
import { CookieParseService, GetUserIdService, } from "@/models/application/service";
import { UserRepository } from "@/models/infrastructure/repository";


export default class GoogleOauthGETUseCase extends AbsUseCase<GoogleOauthPayload.GETRequestType, GoogleOauthPayload.GETResponseType> {
    userRepository: UserRepository
    cookieParseService: CookieParseService;
    getUserIdService: GetUserIdService;

    constructor(
        request: GoogleOauthPayload.GETRequestType,
        userRepository: UserRepository,
        cookieParseService: CookieParseService,
        getUserIdService: GetUserIdService,
    ){
        super(request)
        this.userRepository = userRepository
        this.cookieParseService = cookieParseService
        this.getUserIdService = getUserIdService
    }

    async execute(): Promise<GoogleOauthPayload.GETResponseType> {
        const { user_id } = await this.cookieParseService.execute(this.request);
        
        const selected_user = await this.userRepository.selectById(user_id);
        if (!selected_user) throw new UseCaseError("ユーザが見つかりませんでした", user_id, 404);

        return {
            channel_id: selected_user.channel_id.value,
            name: selected_user.name.value,
            avatar: selected_user.avatar.value
        }
    }

}