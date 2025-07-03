"use client";
import { useState, useEffect } from "react";
import { useCallApi } from "@/hooks";

import { GoogleOauthPayload, SchedulePayload, ScheduleEventsPayload } from "@/models/application/payload";

export default function useScheduleController() {
    const [user_info, setUserInfo] = useState<GoogleOauthPayload.GETResponseType>()
    const [calendars, setCalendars] = useState<SchedulePayload.GETResponseType['calendars']>([]);
    const [calendar_id, setCalendarId] = useState<string>();
    const [events, setEvents] = useState<ScheduleEventsPayload.GETResponseType['events']>([]);

    const [this_week_days, setThisWeekDays] = useState<Date[]>([])

    const { fetchAPI } = useCallApi();

    useEffect(()=>{
        getUserInfoEvent();
        getCalendarsEvent();
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

    useEffect(()=>{
        if (calendar_id) getCalendarEventsEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[calendar_id])

    const getUserInfoEvent = async () => {
        await fetchAPI(
            '/api/google-oauth',
            'GET',
            undefined,
            undefined,
            'ユーザのチャンネル情報の取得に失敗しました。',
            (response: GoogleOauthPayload.GETResponseType) => setUserInfo(response)
        )
    }


    const getCalendarsEvent = async () => {
        await fetchAPI(
            '/api/schedule',
            'GET',
            undefined,
            undefined,
            'Googleカレンダーの取得に失敗しました。',
            (response: SchedulePayload.GETResponseType) => setCalendars(response.calendars)
        )
    }

    const getCalendarEventsEvent = async () => {
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
        calendars,
        events,
        this_week_days,
        setCalendarId
    }
}