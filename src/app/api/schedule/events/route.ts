import errorHandling from "@/utils/errorHandling"

import { ScheduleEventsGETUseCase } from "@/models/application/usecase"
import { GetCalendarEventsService, GetEventColorsService } from "@/models/application/service"

const getCalendarEventsService = new GetCalendarEventsService();
const getEventColorsService = new GetEventColorsService();


export async function GET(request: Request) {
    return errorHandling(request, async (request) => {
        const usecase = new ScheduleEventsGETUseCase(
            request, 
            getCalendarEventsService, 
            getEventColorsService
        );
        const response = await usecase.execute();

        return Response.json(response)
    })
}