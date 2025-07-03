import { calendar_v3 } from "googleapis";

export type GETRequestType = Request;

export type GETResponseType = {
    calendars: Pick<calendar_v3.Schema$CalendarListEntry, 'id'|'summary'|'backgroundColor'>[]
}