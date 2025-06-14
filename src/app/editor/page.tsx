"use client";

import { SimpleGrid, GridItem, Button, Flex, Heading, ScrollArea, Separator, Text } from "@yamada-ui/react";
import { IoSettingsSharp, IoArrowUndo, IoArrowRedo } from "react-icons/io5";
import { LuSwords } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa";


import { LiveBackgroundProvider } from "@/components/provider";
import JoinerAvatar from "./joinerAvatar";
import LogItem from "./logItem";

export default function Editor() {
    return (
        <LiveBackgroundProvider>
            <SimpleGrid w="full" h="2xl" columns={{md: 2, base: 3}} rows={6} spacing={4} gap={{sm: 2, base: 4}} minW="265px">
                <GridItem colSpan={{md: 2, base: 3}} rowSpan={1} rounded="md" bgGradient="linear(to-br, rgba(41, 50, 60, 0.9), rgba(72, 85, 99, 0.8))" p={{sm: 2, base: 4}}>
                    <Heading size="xs" color="white" mb={2}>参加者</Heading>
                    <Separator mt={2} mb={2} />
                    <Flex justify="center" align="center" gap={{sm: 2, md: 4, base: 6}} p={3}>
                        <JoinerAvatar />
                        <JoinerAvatar />
                        <JoinerAvatar />
                        <JoinerAvatar />
                    </Flex>
                </GridItem>
                <GridItem colSpan={1} rowSpan={5} rounded="md" bgGradient="linear(to-br, rgba(72, 85, 99, 0.6), rgba(41, 50, 60, 0.8))" p={{sm: 2, base: 4}}>
                    <Heading size="xs" color="white">待機者</Heading>
                    <Separator mt={2} mb={2} />
                    <ScrollArea h="354px" overflowX="hidden">
                        <SimpleGrid columns={{md:3, base: 4}} spacing={2} gap={{sm: 1, base: 4}} justifyItems="center" p={3}>
                            { Array(30).fill(0).map((_, i) => <JoinerAvatar key={i} />)}
                        </SimpleGrid>
                    </ScrollArea>
                </GridItem>
                <GridItem  colSpan={1} rowSpan={5} rounded="md" bgGradient="linear(to-br, rgba(41, 50, 60, 0.6), rgba(72, 85, 99, 0.6))" p={{sm: 2, base:4}} display={{md: "none"}}>
                    <Heading size="xs" color="white">ログ</Heading>
                    <Separator mt={2} mb={2} />
                    <ScrollArea h="354px">
                        <Flex direction="column" gap={1}>
                            { Array(20).fill(0).map((_, i) => <LogItem key={i} />)}
                        </Flex>
                    </ScrollArea>
                </GridItem>
                <GridItem colSpan={1} rowSpan={5} rounded="md" bgGradient="linear(to-br, rgba(72, 85, 99, 0.8), rgba(41, 50, 60, 0.6))" p={{sm: 2, base:4}}>
                    <Flex direction="column" gap={2} h="full" justify="space-between">
                        <Button colorScheme="blackAlpha" color="amber.400" size="lg" startIcon={<LuSwords/>}>クエスト終了</Button>
                        <Flex gap={2}>
                            <Button colorScheme="blackAlpha" size="md" startIcon={<IoArrowUndo />} w="50%">元に戻す</Button>
                            <Button colorScheme="blackAlpha" size="md" startIcon={<IoArrowRedo />} w="50%">やり直し</Button>
                        </Flex>
                        <Button colorScheme="blackAlpha" startIcon={<FaYoutube/>} color="red.400">配信に接続</Button>
                        <Button colorScheme="blackAlpha" startIcon={<IoSettingsSharp/>}>Bot設定</Button>
                        <Flex direction="column" bgColor="#0000005C" rounded="md" p={{sm: 2, base:4}}>
                            <Text fontWeight="bold" isTruncated>ライブタイトル</Text>
                            <Separator mt={2} mb={2} />
                            <Flex align="center">
                                <Text isTruncated>参加希望者数：</Text>
                                <Heading as="h2" isTruncated ml="auto">100</Heading>
                            </Flex>
                            <Flex align="center">
                                <Text isTruncated>クエスト出発数：</Text>
                                <Heading as="h2" isTruncated ml="auto">100</Heading>
                            </Flex>
                        </Flex>
                    </Flex>
                </GridItem>
            </SimpleGrid>
        </LiveBackgroundProvider>
    )
}