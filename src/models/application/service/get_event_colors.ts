import AbsService from "./abstruct";
import { ServiceError } from "@/models/error";

import { calendar_v3 } from "googleapis";

export default class GetEventColorsService extends AbsService<undefined,calendar_v3.Schema$Colors> {
    async execute(): Promise<calendar_v3.Schema$Colors> {
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/colors?key=${process.env.GOOGLE_API_KEY}`,
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

        if (response_data.kind != "calendar#colors") throw new ServiceError(
            "GoogleCalendarAPIのレスポンスが不正です。異なるリクエストを送信した可能性があります。",
            response_data,
            400
        );

        return response_data
    }
}