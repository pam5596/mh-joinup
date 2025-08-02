"use client";
import { useEffect, useState } from 'react';
import { Flex, Card, Text } from "@yamada-ui/react";

import { ScheduleEventsPayload } from "@/models/application/payload";

type ArrayElement<T extends readonly unknown[]> = T[number]
type Props = {
    date: Date,
    event?: ArrayElement<ScheduleEventsPayload.GETResponseType['events']>,
}

export default function WeeklyEvent(props: Props) {
    const [day, setDay] = useState<string>()
    const [startTime, setStartTime] = useState<string>();

    useEffect(()=>{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setDay((_) => {
            const days = ['日','月','火','水','木','金','土']
            return days[props.date.getDay()]
        })

        if (props.event?.start?.dateTime) {
            const start_time = new Date(props.event.start.dateTime)
            start_time.setHours(start_time.getHours() + 9);
            setStartTime(
                start_time.toLocaleTimeString(
                'ja-JP', {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            ) + '~')
        }
    },[props])

    return (
        <Flex flexDirection="row" gap={2} justifyContent="space-between">
            <Card
                flexDirection="row"
                alignItems="center"
                justifyContent="space-around"
                borderRadius={50} 
                variant="solid" 
                bgImage={
                    [0,6].includes(props.date.getDay()) ? 
                    "linear-gradient(-60deg, #5b7bda 0%, #a390de 100%);" 
                    : "linear-gradient(135deg, #ff9900 0%, #ffcd7d 100%)"
                }
                p={2}
                minW="20%"
            >
                <Text fontSize="xl" color="white" fontFamily='ReggaeOne, sans-serif'>
                    {props.date.getMonth()+1}/{props.date.getDate()}
                </Text>
                <Text fontSize="sm" fontFamily='ReggaeOne, sans-serif'>
                    ({day})
                </Text>
            </Card>
            <Card justifyContent="center" variant="outline" colorScheme="whiteAlpha" p={2} w="full" minW="282">
                <Text color="white" isTruncated fontSize="lg" fontFamily='ReggaeOne, sans-serif'>
                    { props.event?.summary || '休み'}
                </Text>
            </Card>
            <Card justifyContent="center"  variant="solid" colorScheme="whiteAlpha" p={2} minW="20%">
                <Text 
                    textAlign="center" 
                    fontSize="lg" 
                    color="white" 
                    fontFamily='ReggaeOne, sans-serif'
                    bgClip="text"
                    bgGradient="linear-gradient(45deg, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%)"
                >
                    {startTime}
                </Text>
            </Card>
        </Flex>
    )
}