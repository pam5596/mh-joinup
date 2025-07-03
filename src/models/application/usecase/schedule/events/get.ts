import AbsUseCase from "../../abstruct";
import { UseCaseError } from "@/models/error";

import { ScheduleEventsPayload } from "@/models/application/payload";
import { GetCalendarEventsService, GetEventColorsService } from "@/models/application/service";


export default class ScheduleEventsGETUseCase extends AbsUseCase<ScheduleEventsPayload.GETRequestType, ScheduleEventsPayload.GETResponseType> {
    getCalendarEventsService: GetCalendarEventsService;
    getEventColorsService: GetEventColorsService;

    constructor(
        request: ScheduleEventsPayload.GETRequestType,
        getCalendarEventsService: GetCalendarEventsService,
        getEventColorsService: GetEventColorsService
    ){
        super(request)
        this.getCalendarEventsService = getCalendarEventsService
        this.getEventColorsService = getEventColorsService
    }

    async execute(): Promise<ScheduleEventsPayload.GETResponseType> {
        const search_params = new URL(this.request.url).searchParams
        const calendar_id = search_params.get('calendar_id')

        if (!calendar_id) throw new UseCaseError(
            'クエリパラメータにcalendar_idが含まれていません',
            this.request.url,
            400
        )

        const events = await this.getCalendarEventsService.execute({ calendar_id });
        const { event: colors } = await this.getEventColorsService.execute();
        
        if (events.length) {
            return {
                events: events.map((event) => ({
                    id: event.id,
                    summary: event.summary,
                    start: event.start,
                    color: colors![event.colorId || '1'].background || ''
                }))
            }
        } else {
            return {
                events: []
            }
        }
    }
}