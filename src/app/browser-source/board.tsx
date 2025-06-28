"use client";
import { Box, Flex, Heading, Separator, SimpleGrid, GridItem, ScrollArea } from "@yamada-ui/react";
import JoinerItem from "./joinerItem";

import { useBrowserSource } from "../controller";

export default function Board() {
    const { containerRef, board, liver_info } = useBrowserSource();

    return (
        <Box color="white" bgColor="transparent" fontFamily='ReggaeOne, sans-serif'>
            <Flex direction="column" w="full">
                <Box rounded="md" bgColor="rgb(2 6 23 / 0.8)" p={{sm: 2, base: 4}} borderColor="#bf730a" borderWidth={4} borderStyle="double">
                    <Heading size="md" color="white" fontFamily='ReggaeOne, sans-serif'>現在の参加者</Heading>
                    <Separator />
                    <Flex direction="column" gap={{sm: 2, base: 4}} mt={4} align="center">
                        {liver_info ? 
                            <JoinerItem
                                key={0}
                                is_liver
                                status="joiner"
                                joiner_info={{
                                    name: liver_info.name,
                                    avatar: liver_info.avatar,
                                    quest: 0
                                }}
                            /> : null
                        }
                        {board?.joiner.map((joiner ,i)=>(
                            <JoinerItem
                                key={i+1} 
                                status="joiner"
                                joiner_info={joiner}
                            />
                        ))}
                    </Flex>
                </Box>
                <Box rounded="md" bgColor="rgb(51 65 85 / 0.8)" p={{sm: 2, base: 4}} borderWidth={4} borderColor='rgb(51 65 85 / 0.8)'>
                    <Flex justifyContent="space-between">
                        <Heading size="md" color="white" fontFamily='ReggaeOne, sans-serif'>順番待ち：</Heading>
                        <Heading size="md" color="white" fontFamily='ReggaeOne, sans-serif'>{board?.waiter.length || 0}人</Heading>
                    </Flex>
                    <Separator />
                    <ScrollArea overflow="hidden" type="always" maxH="180px" p={2} ref={containerRef}>
                        <SimpleGrid gap={{sm: 2, base: 4}} mt={2}>
                            {board?.waiter.map((waiter, i)=>(
                                <GridItem key={i} colSpan={1}>
                                    <JoinerItem 
                                        status="waiter"
                                        joiner_info={waiter}
                                    />
                                </GridItem>
                            ))}
                        </SimpleGrid>
                    </ScrollArea>
                </Box>
            </Flex>
        </Box>
    )
}