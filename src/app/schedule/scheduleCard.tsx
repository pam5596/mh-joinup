"use client";
import { Card, Heading, Flex, Separator } from "@yamada-ui/react";
import WeeklyEvent from "./weeklyEvent";

import { ScheduleEventsPayload } from "@/models/application/payload";

type Props = {
    events: ScheduleEventsPayload.GETResponseType['events'],
    this_week_days: Date[]
}

export default function ScheduleCard(props: Props) {
    return (
        <Card w="full" p={4} maxW="800px" bgImage="linear-gradient(45deg, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%)">
            <Heading size="xl" color="white" fontFamily='ReggaeOne, sans-serif'>
                今週の配信スケジュール
            </Heading>
            <Separator mt={2} mb={2} />
            <Flex flexDirection="column" gap={4} p={2}>
                { props.this_week_days.map((day, i) => (
                    <WeeklyEvent 
                        key={i} 
                        date={day} 
                        event={props.events.find((event) => {
                            if (!event.start || !event.start.dateTime) return false;
                            const event_start_time = new Date(event.start.dateTime);
                            return day.getDay() == event_start_time.getDay();
                        })}
                    />
                ))}
            </Flex>
        </Card>
    )
}