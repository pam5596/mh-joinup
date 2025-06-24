import errorHandling from "@/utils/errorHandling";

import { BrowserSourceGETUseCase } from "@/models/application/usecase";
import { CookieParseService, CreateHashedIdService } from "@/models/application/service";

const cookieParseService = new CookieParseService();
const createHashedIdService = new CreateHashedIdService();


export async function GET(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new BrowserSourceGETUseCase(
            request,
            cookieParseService,
            createHashedIdService
        );

        const response = await usecase.execute();

        return Response.json(response);
    })
}