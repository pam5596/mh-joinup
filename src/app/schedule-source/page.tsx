"use client";
import { MainBackgroundProvider } from "@/components/provider";
import ScheduleCard from "./scheduleCard";

import { useScheduleSourceController } from "../controller";

export default function ScheduleSource() {
    const { user_info, events, this_week_days } = useScheduleSourceController(); 

    return (
        <MainBackgroundProvider>
            <ScheduleCard user_info={user_info} events={events} this_week_days={this_week_days}/>
        </MainBackgroundProvider>
    )
}