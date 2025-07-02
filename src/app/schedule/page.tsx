"use client";
import { Flex, Card, Heading, Separator, Text, Select, Option, Avatar } from "@yamada-ui/react";
import { FaCalendarCheck } from "react-icons/fa";
import { MainBackgroundProvider } from "@/components/provider";
import ScheduleCard from "./scheduleCard";

export default function Schedule() {
    return (
        <MainBackgroundProvider>
            <Flex flexDirection="column" alignItems="center" gap={4} w="full">
                <Card variant="solid" colorScheme="black" w="full" p={4}>
                    <Heading size="xs" color="white" mb={2}>設定</Heading>
                    <Separator mt={2} mb={2} />
                    <Flex columns={2} p={2}>
                        <Flex w="full" alignItems="center">
                            <Text w="50%">Googleカレンダー：</Text>
                            <Select 
                                placeholder="待機者を選択" 
                                placeholderInOptions={false} 
                                textColor="white" 
                                iconProps={{color: "white"}} 
                                listProps={{bg: "#2c2c2c", rounded: "md", _scrollbar: { display: "none" }}}
                            >
                                {Array(10).fill(0).map((_, i) => (
                                    <Option key={i} value={''}>
                                        <Flex align="center" gap={2}>
                                            <Avatar size="xs" icon={<FaCalendarCheck/>} color="black" />
                                            <Text maxW="150px" isTruncated>あいうえお</Text>
                                        </Flex>
                                    </Option>
                                ))}
                            </Select>
                        </Flex>
                    </Flex>
                </Card>
                <ScheduleCard />
            </Flex>
        </MainBackgroundProvider>
    )
}