"use client";
import { Flex, Card, Heading, Separator, Text, Select, Option, Avatar, Button } from "@yamada-ui/react";
import { FaCalendarCheck, FaExternalLinkAlt } from "react-icons/fa";
import { MainBackgroundProvider } from "@/components/provider";
import ScheduleCard from "./scheduleCard";

import { useScheduleController } from "../controller";

export default function Schedule() {
    const { user_info, calendars, events, this_week_days, setCalendarId, toScheduleSourceEvent } = useScheduleController(); 

    return (
        <MainBackgroundProvider>
            <Flex flexDirection="column" alignItems="center" gap={4} w="full">
                <Card variant="solid" colorScheme="black" w="full" p={4}>
                    <Heading size="xs" color="white" mb={2}>設定</Heading>
                    <Separator mt={2} mb={2} />
                    <Flex columns={2} p={2} flexDirection="column" gap={4}>
                        <Flex w="full" alignItems="center">
                            <Text w="50%">Googleカレンダー：</Text>
                            <Select 
                                placeholder="カレンダーを選択" 
                                placeholderInOptions={false} 
                                textColor="white" 
                                iconProps={{color: "white"}} 
                                listProps={{bg: "#2c2c2c", rounded: "md", _scrollbar: { display: "none" }}}
                                onChange={setCalendarId}
                            >
                                {calendars?.map((calendar, i) => (
                                    <Option key={i} value={calendar.id || ''}>
                                        <Flex align="center" gap={2}>
                                            <Avatar size="xs" icon={<FaCalendarCheck/>} color="white" bgColor={calendar.backgroundColor || 'whiteAlpha.700'} />
                                            <Text maxW="150px" isTruncated>{calendar.summary}</Text>
                                        </Flex>
                                    </Option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex flexDirection="row-reverse">
                            <Button
                                w="30%"
                                colorScheme="violet"
                                startIcon={<FaExternalLinkAlt/>}
                                onClick={toScheduleSourceEvent}
                                disabled={!user_info || !events.length}
                            >
                                ブラウザソースとして開く
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
                <ScheduleCard user_info={user_info} events={events} this_week_days={this_week_days}/>
            </Flex>
        </MainBackgroundProvider>
    )
}