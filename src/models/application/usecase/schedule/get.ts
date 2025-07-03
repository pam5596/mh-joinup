import AbsUseCase from "../abstruct";

import { SchedulePayload } from "@/models/application/payload";
import { CookieParseService, GetUserCalendarsService } from "@/models/application/service";


export default class ScheduleGETUseCase extends AbsUseCase<SchedulePayload.GETRequestType, SchedulePayload.GETResponseType> {
    cookieParseService: CookieParseService;
    getUserCalendarService: GetUserCalendarsService;

    constructor(
        request: Request,
        cookieParseService: CookieParseService,
        getUserCalendarService: GetUserCalendarsService
    ){
        super(request)
        this.cookieParseService = cookieParseService
        this.getUserCalendarService = getUserCalendarService
    }

    async execute(): Promise<SchedulePayload.GETResponseType> {
        const { auth_token } = await this.cookieParseService.execute(this.request);

        const calendars = await this.getUserCalendarService.execute({ auth_token })
        
        if (calendars.length) {
            return {
                calendars: calendars.map((calendar) => ({
                    id: calendar.id,
                    summary: calendar.summary,
                    backgroundColor: calendar.backgroundColor
                }))
            }
        } else {
            return {
                calendars: []
            }
        }
    }
}