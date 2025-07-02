"use client";
import { Card, Heading, Flex, Separator } from "@yamada-ui/react";
import WeeklyEvent from "./weeklyEvent";


export default function ScheduleCard() {
    return (
        <Card w="full" p={4} maxW="800px">
            <Heading size="xl" color="white" fontFamily='ReggaeOne, sans-serif'>
                今週の配信スケジュール
            </Heading>
            <Separator mt={2} mb={2} />
            <Flex flexDirection="column" gap={4} p={2}>
                <WeeklyEvent />
                <WeeklyEvent />
                <WeeklyEvent />
                <WeeklyEvent />
                <WeeklyEvent />
                <WeeklyEvent />
                <WeeklyEvent />
            </Flex>
        </Card>
    )
}