import errorHandling from "@/utils/errorHandling"

import { ScheduleEventsGETUseCase } from "@/models/application/usecase"
import { CookieParseService, GetCalendarEventsService } from "@/models/application/service"

const cookieParseService = new CookieParseService();
const getCalendarEventsService = new GetCalendarEventsService();


export async function GET(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new ScheduleEventsGETUseCase(request, cookieParseService, getCalendarEventsService);
        const response = await usecase.execute();

        return Response.json(response)
    })
}