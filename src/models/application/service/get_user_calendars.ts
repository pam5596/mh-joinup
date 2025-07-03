import AbsService from "./abstruct";
import { ServiceError } from "@/models/error";

import { calendar_v3 } from "googleapis";

export default class GetUserCalendarsService extends AbsService<{auth_token: string},calendar_v3.Schema$CalendarListEntry[]> {
    async execute(request: {auth_token: string}): Promise<calendar_v3.Schema$CalendarListEntry[]> {
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/users/me/calendarList`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${request.auth_token}`,
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

        if (response_data.kind != "calendar#calendarList") throw new ServiceError(
            "GoogleCalendarAPIのレスポンスが不正です。異なるリクエストを送信した可能性があります。",
            response_data,
            400
        );

        if (!response_data.items) throw new ServiceError(
            "GoogleCalendarAPIのレスポンスにカレンダー情報が含まれていません。GoogleCalenderにアクセスしてください。",
            response_data,
            400
        );

        return response_data.items
    }
}