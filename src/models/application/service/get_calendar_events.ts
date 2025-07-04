import AbsService from "./abstruct";
import { ServiceError } from "@/models/error";

import { calendar_v3 } from "googleapis";

export default class GetCalendarEventsService extends AbsService<{calendar_id: string},calendar_v3.Schema$Event[]> {
    async execute(request: {calendar_id: string}): Promise<calendar_v3.Schema$Event[]> {
        const now = new Date(new Date().toLocaleString("ja-JP"));
        
        const sunday = new Date(now);
        sunday.setDate(now.getDate() - now.getDay());
        sunday.setHours(0, 0, 0, 0);

        const saturday = new Date(now);
        saturday.setDate(now.getDate() + (6 - now.getDay()));
        saturday.setHours(23, 59, 59, 999);
        
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${request.calendar_id}/events?maxResults=7&orderBy=startTime&singleEvents=true&timeMin=${sunday.toISOString()}&timeMax=${saturday.toISOString()}&key=${process.env.GOOGLE_API_KEY}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const response_data = await response.json();

        if (!response.ok) throw new ServiceError(
            response_data.error.message,
            response,
            response.status,
        )

        if (response_data.kind != "calendar#events") throw new ServiceError(
            "GoogleCalendarAPIのレスポンスが不正です。異なるリクエストを送信した可能性があります。",
            response_data,
            400
        );

        if (!response_data.items) throw new ServiceError(
            "GoogleCalendarAPIのレスポンスにイベント情報が含まれていません。カレンダーにイベントを作成してください。",
            response_data,
            400
        );

        return response_data.items
    }
}