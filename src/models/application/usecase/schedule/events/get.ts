import AbsUseCase from "../../abstruct";
import { UseCaseError } from "@/models/error";

import { ScheduleEventsPayload } from "@/models/application/payload";
import { CookieParseService, GetCalendarEventsService } from "@/models/application/service";


export default class ScheduleEventsGETUseCase extends AbsUseCase<ScheduleEventsPayload.GETRequestType, ScheduleEventsPayload.GETResponseType> {
    cookieParseService: CookieParseService;
    getCalendarEventsService: GetCalendarEventsService;

    constructor(
        request: ScheduleEventsPayload.GETRequestType,
        cookieParseService: CookieParseService,
        getCalendarEventsService: GetCalendarEventsService
    ){
        super(request)
        this.cookieParseService = cookieParseService
        this.getCalendarEventsService = getCalendarEventsService
    }

    async execute(): Promise<ScheduleEventsPayload.GETResponseType> {
        const { auth_token } = await this.cookieParseService.execute(this.request);
        
        const search_params = new URL(this.request.url).searchParams
        const calendar_id = search_params.get('calendar_id')

        if (!calendar_id) throw new UseCaseError(
            'クエリパラメータにcalendar_idが含まれていません',
            this.request.url,
            400
        )

        const events = await this.getCalendarEventsService.execute({ auth_token, calendar_id });
        
        if (events.length) {
            return {
                events: events.map((event) => ({
                    id: event.id,
                    summary: event.summary,
                    start: event.start,
                    colorId: event.colorId
                }))
            }
        } else {
            return {
                events: []
            }
        }
    }
}