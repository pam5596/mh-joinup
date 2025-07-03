import { calendar_v3 } from "googleapis";

export type GETRequestType = Request;

export type GETResponseType = {
    events: (Pick<calendar_v3.Schema$Event, 'id'|'summary'|'start'> & { color?: string })[]
    // colors: Pick<calendar_v3.Schema$Colors, 'calendar'>
}