"use client";
import { Card, Heading, Flex, Separator, Image, Avatar } from "@yamada-ui/react";
import WeeklyEvent from "./weeklyEvent";

import { useScheduleSourceController } from "../controller";

export default function ScheduleCard() {
    const { user_info, events, this_week_days } = useScheduleSourceController(); 

    return (
        <Card w="full" p={4} maxW="800px" bgImage="linear-gradient(45deg, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%)">
            <Flex gap={2}>
                <Image aspectRatio="1/1" w="48px" src="/logo.svg" alt="ロゴ" />
                <Heading size="xl" color="white" fontFamily='ReggaeOne, sans-serif'>
                    今週の配信スケジュール
                </Heading>
                <Avatar marginLeft="auto" src={user_info?.avatar} name={user_info?.name} />
            </Flex>
            <Separator mt={2} mb={2} />
            <Flex flexDirection="column" gap={4} p={2}>
                { this_week_days.map((day, i) => (
                    <WeeklyEvent 
                        key={i} 
                        date={day} 
                        event={events.find((event) => {
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