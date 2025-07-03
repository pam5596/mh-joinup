"use client";
import { useEffect, useState } from 'react';
import { Flex, Card, Heading, Text } from "@yamada-ui/react";

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
            setStartTime(start_time.toLocaleTimeString().slice(0,5) + '~')
        }
    },[props])

    return (
        <Flex flexDirection="row" gap={4} justifyContent="space-between">
            <Card w="17%" 
                flexDirection="row"
                alignItems="end"
                justifyContent="space-around"
                borderRadius={50} 
                variant="solid" 
                bgImage={
                    [0,6].includes(props.date.getDay()) ? 
                    "linear-gradient(-60deg, #5b7bda 0%, #a390de 100%);" 
                    : "linear-gradient(135deg, #fcd060 0%, #ff8e2b 100%)"
                }
                p={2}
            >
                <Heading textAlign="center" size="md" color="white" fontFamily='ReggaeOne, sans-serif'>
                    {props.date.getMonth()+1}/{props.date.getDate()}
                </Heading>
                <Text size="sm" fontFamily='ReggaeOne, sans-serif'>
                    ({day})
                </Text>
            </Card>
            <Card justifyContent="center" variant="outline" colorScheme="whiteAlpha" w="70%" p={2}>
                <Heading isTruncated size="md" fontFamily='ReggaeOne, sans-serif'>
                    { props.event?.summary || '休み'}
                </Heading>
            </Card>
            <Card justifyContent="center"  variant="solid" colorScheme="whiteAlpha" w="20%" p={2}>
                <Heading 
                    textAlign="center" 
                    size="md" 
                    color="white" 
                    fontFamily='ReggaeOne, sans-serif'
                    bgClip="text"
                    bgGradient="linear-gradient(45deg, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%)"
                >
                    {startTime}
                </Heading>
            </Card>
        </Flex>
    )
}