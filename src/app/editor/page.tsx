"use client";

import { SimpleGrid, GridItem, Button, Flex, Heading, ScrollArea } from "@yamada-ui/react";
import { IoSettingsSharp } from "react-icons/io5";
import { LuSwords } from "react-icons/lu";

import { MainBackgroundProvider } from "@/components/provider";
import EditorAvatar from "./avatar";

export default function Editor() {
    return (
        <MainBackgroundProvider>
            <SimpleGrid w="full" h="full" columns={2} rows={3} spacing={4} gap={{sm: 2, base: 4}} minW="265px">
                <GridItem colSpan={2} rowSpan={1} rounded="md" bgGradient="linear(to-br, rgba(41, 50, 60, 0.9), rgba(72, 85, 99, 0.8))" p={{sm: 2, base: 4}}>
                    <Heading size="xs" color="white" mb={2}>参加者</Heading>
                    <Flex justify="center" align="center" gap={{sm: 2, md: 4, base: 6}}>
                        <EditorAvatar />
                        <EditorAvatar />
                        <EditorAvatar />
                        <EditorAvatar />
                    </Flex>
                </GridItem>
                <GridItem colSpan={1} rowSpan={2} rounded="md" bgGradient="linear(to-br, rgba(72, 85, 99, 0.6), rgba(41, 50, 60, 0.8))" p={{sm: 2, base: 4}}>
                    <Heading size="xs" color="white" mb={2}>待機者</Heading>
                    <ScrollArea h="230px">
                        <SimpleGrid columns={{md:3, base: 4}} spacing={2} gap={{sm: 1, base: 4}} justifyItems="center" p={2}>
                            { Array(20).fill(0).map((_, i) => <EditorAvatar key={i} />)}
                        </SimpleGrid>
                    </ScrollArea>
                </GridItem>
                <GridItem colSpan={1} rowSpan={1} rounded="md" bgGradient="linear(to-br, rgba(41, 50, 60, 0.8), rgba(72, 85, 99, 0.6))" p={{sm: 2, base:4}}>
                    <Flex direction="column" gap={2}>
                        <Button colorScheme="blackAlpha" color="amber.300" size="lg" startIcon={<LuSwords/>}>クエスト終了</Button>
                        <Button colorScheme="blackAlpha" size="sm" startIcon={<IoSettingsSharp/>}>Bot設定</Button>
                    </Flex>
                </GridItem>
                <GridItem colSpan={1} rowSpan={1} rounded="md" bgGradient="linear(to-br, rgba(41, 50, 60, 0.8), rgba(72, 85, 99, 0.6))" p={{sm: 2, base:4}} h={40}>
                    <Heading size="xs" color="white" mb={2}>履歴</Heading>
                </GridItem>
            </SimpleGrid>
        </MainBackgroundProvider>
    )
}