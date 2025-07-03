import AbsService from "./abstruct";
import { ServiceError } from "@/models/error";

import { calendar_v3 } from "googleapis";

export default class GetEventColorsService extends AbsService<{auth_token: string},calendar_v3.Schema$Colors> {
    async execute(request: {auth_token: string}): Promise<calendar_v3.Schema$Colors> {
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/colors`,
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

        if (response_data.kind != "calendar#colors") throw new ServiceError(
            "GoogleCalendarAPIのレスポンスが不正です。異なるリクエストを送信した可能性があります。",
            response_data,
            400
        );

        return response_data.event
    }
}