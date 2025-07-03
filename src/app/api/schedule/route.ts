import errorHandling from "@/utils/errorHandling"

// import { SchedulePayload } from "@/models/application/payload"
import { ScheduleGETUseCase } from "@/models/application/usecase"
import { CookieParseService, GetUserCalendarsService } from "@/models/application/service"

const cookieParseService = new CookieParseService();
const getUserCalendarService = new GetUserCalendarsService();


export async function GET(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new ScheduleGETUseCase(request, cookieParseService, getUserCalendarService);
        const response = await usecase.execute();

        return Response.json(response)
    })
}