import AbsUseCase from "../abstruct";
import { UseCaseError } from "@/models/error";

import { GoogleOauthPayload } from "@/models/application/payload";
import { CookieParseService, GetUserIdService, ConfirmTokenService } from "@/models/application/service";
import { UserRepository } from "@/models/infrastructure/repository";


export default class GoogleOauthGETUseCase extends AbsUseCase<GoogleOauthPayload.GETRequestType, GoogleOauthPayload.GETResponseType> {
    userRepository: UserRepository
    cookieParseService: CookieParseService;
    getUserIdService: GetUserIdService;
    confirmTokenService: ConfirmTokenService;

    constructor(
        request: GoogleOauthPayload.GETRequestType,
        userRepository: UserRepository,
        cookieParseService: CookieParseService,
        getUserIdService: GetUserIdService,
        confirmTokenService: ConfirmTokenService
    ){
        super(request)
        this.userRepository = userRepository
        this.cookieParseService = cookieParseService
        this.getUserIdService = getUserIdService
        this.confirmTokenService = confirmTokenService
    }

    async execute(): Promise<GoogleOauthPayload.GETResponseType> {
        const { user_id, auth_token } = await this.cookieParseService.execute(this.request);

        await this.confirmTokenService.execute(auth_token);

        const selected_user = await this.userRepository.selectById(user_id);
        if (!selected_user) throw new UseCaseError("ユーザが見つかりませんでした", user_id, 404);

        return {
            channel_id: selected_user.channel_id.value,
            name: selected_user.name.value,
            avatar: selected_user.avatar.value
        }
    }

}