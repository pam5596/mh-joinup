"use client";
import { Suspense } from "react";
import ScheduleCard from "./scheduleCard";

export default function ScheduleSource() {
    return (
        <Suspense>
            <ScheduleCard />
        </Suspense>
    )
}