import AbsUseCase from "../abstruct";
import { UseCaseError } from "@/models/error";

import { ManagementPayload } from "@/models/application//payload";
import { CookieParseService, CreateHashedIdService } from "@/models/application/service";

export default class ManagementPUTUseCase extends AbsUseCase<ManagementPayload.PUTRequestType, ManagementPayload.PUTResponseType> {
    cookieParseService: CookieParseService;
    createHashedIdServide: CreateHashedIdService;

    constructor(
        request: ManagementPayload.PUTRequestType,
        cookieParseService: CookieParseService,
        createHashedIdServide: CreateHashedIdService
    ) {
        super(request)
        this.cookieParseService = cookieParseService
        this.createHashedIdServide = createHashedIdServide
    }

    async execute(): Promise<ManagementPayload.PUTResponseType> {
        const { user_id } = await this.cookieParseService.execute(this.request);
        const hased_user_id = await this.createHashedIdServide.execute(user_id);

        const request_body = await this.request.json() as ManagementPayload.PUTResponseType;

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SOCKET_API_DOMAIN}/mhjoinup/emit_management/${hased_user_id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request_body)
            }
        )

        const response_json = await response.json();

        if (!response.ok) throw new UseCaseError(
            response_json.detail[0].msg || response.statusText,
            response,
            response.status
        )

        return response_json;
    }

}