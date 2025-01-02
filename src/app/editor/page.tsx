"use client";

import { SimpleGrid, GridItem, Button, Flex, Heading, ScrollArea, Separator } from "@yamada-ui/react";
import { IoSettingsSharp } from "react-icons/io5";
import { LuSwords } from "react-icons/lu";

import { LiveBackgroundProvider } from "@/components/provider";
import EditorAvatar from "./avatar";
import Log from "./log";

export default function Editor() {
    return (
        <LiveBackgroundProvider>
            <SimpleGrid w="full" h="2xl" columns={2} rows={6} spacing={4} gap={{sm: 2, base: 4}} minW="265px">
                <GridItem colSpan={2} rowSpan={1} rounded="md" bgGradient="linear(to-br, rgba(41, 50, 60, 0.9), rgba(72, 85, 99, 0.8))" p={{sm: 2, base: 4}}>
                    <Heading size="xs" color="white" mb={2}>参加者</Heading>
                    <Separator mt={2} mb={2} />
                    <Flex justify="center" align="center" gap={{sm: 2, md: 4, base: 6}} p={3}>
                        <EditorAvatar />
                        <EditorAvatar />
                        <EditorAvatar />
                        <EditorAvatar />
                    </Flex>
                </GridItem>
                <GridItem colSpan={1} rowSpan={5} rounded="md" bgGradient="linear(to-br, rgba(72, 85, 99, 0.6), rgba(41, 50, 60, 0.8))" p={{sm: 2, base: 4}}>
                    <Heading size="xs" color="white">待機者</Heading>
                    <Separator mt={2} mb={2} />
                    <ScrollArea h="354px" overflowX="hidden">
                        <SimpleGrid columns={{md:3, base: 4}} spacing={2} gap={{sm: 1, base: 4}} justifyItems="center" p={3}>
                            { Array(30).fill(0).map((_, i) => <EditorAvatar key={i} />)}
                        </SimpleGrid>
                    </ScrollArea>
                </GridItem>
                <GridItem colSpan={1} rowSpan={1} rounded="md" bgGradient="linear(to-br, rgba(41, 50, 60, 0.8), rgba(72, 85, 99, 0.6))" p={{sm: 2, base:4}}>
                    <Flex direction="column" gap={2} h="full">
                        <Button colorScheme="blackAlpha" color="amber.300" size="lg" startIcon={<LuSwords/>} h="70%">クエスト終了</Button>
                        <Button colorScheme="blackAlpha" size="sm" startIcon={<IoSettingsSharp/>} h="30%">Bot設定</Button>
                    </Flex>
                </GridItem>
                <GridItem  colSpan={1} rowSpan={4} rounded="md" bgGradient="linear(to-br, rgba(41, 50, 60, 0.8), rgba(72, 85, 99, 0.6))" p={{sm: 2, base:4}}>
                    <Heading size="xs" color="white">ログ</Heading>
                    <Separator mt={2} mb={2} />
                    <ScrollArea h="217px">
                        <Flex direction="column" gap={1}>
                            { Array(20).fill(0).map((_, i) => <Log key={i} />)}
                        </Flex>
                    </ScrollArea>
                </GridItem>
            </SimpleGrid>
        </LiveBackgroundProvider>
    )
}