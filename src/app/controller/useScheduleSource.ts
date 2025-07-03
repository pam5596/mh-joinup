"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import { GoogleOauthPayload, ScheduleEventsPayload } from "@/models/application/payload";

export default function useScheduleSourceController() {
    const [user_info, setUserInfo] = useState<GoogleOauthPayload.GETResponseType>()
    const [events, setEvents] = useState<ScheduleEventsPayload.GETResponseType['events']>([]);

    const [this_week_days, setThisWeekDays] = useState<Date[]>([])

    const { fetchAPI } = useCallApi();
    const searchParams = useSearchParams();

    useEffect(()=>{
        const calendar_id = searchParams.get('calendar_id');
        const channel_id = searchParams.get('channel_id');

        if (calendar_id && channel_id) {
            getUserInfoEvent(channel_id);
            getCalendarEventsEvent(calendar_id);
        }

        setThisWeekDays(() => {
            const now = new Date();

            const sunday = new Date(now);
            sunday.setDate(now.getDate() - now.getDay());
            sunday.setHours(0, 0, 0, 0);

            return Array.from({ length: 7 }, (_, i) => {
                const d = new Date(sunday);
                d.setDate(sunday.getDate() + i);
                return d;
            });
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getUserInfoEvent = async (channel_id: string) => {
        await fetchAPI(
            `/api/browser-source?channel_id=${channel_id}`,
            'GET',
            undefined,
            undefined,
            'ユーザのチャンネル情報の取得に失敗しました',
            (response: GoogleOauthPayload.GETResponseType) => setUserInfo(response)
        )
    }


    const getCalendarEventsEvent = async (calendar_id: string) => {
        await fetchAPI(
            `/api/schedule/events?calendar_id=${calendar_id}`,
            'GET',
            undefined,
            undefined,
            'Googleカレンダーのイベントの取得に失敗しました。',
            (response: ScheduleEventsPayload.GETResponseType) => {
                setEvents(response.events)
            }
        )
    }

    return {
        user_info,
        events,
        this_week_days
    }
}