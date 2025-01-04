"use client";
import { useRef, useEffect } from "react";
import { Box, Flex, Heading, Separator, SimpleGrid, GridItem, ScrollArea } from "@yamada-ui/react";
import JoinerItem from "./joinerItem";

export default function BrowserSource() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollInfo = {step: 1, interval: 30, waittime: 5000};

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scroll = () => {
            container.scrollTop += scrollInfo.step;

            if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
                container.scrollTop = 0;
                setTimeout(scroll, scrollInfo.waittime)
            } else {
                setTimeout(scroll, scrollInfo.interval);
            }
        };

        const initialTimeout = setTimeout(scroll, scrollInfo.waittime);
        return () => {
            clearTimeout(initialTimeout);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box color="white" bgColor="transparent">
            <Flex direction="column" gap={{sm: 2, base: 4}} w="full">
                <Box rounded="md" bgGradient="linear(to-br, rgba(21, 29, 37, 0.8), rgba(42, 49, 58, 0.7))" p={{sm: 2, base: 4}} borderColor="amber.400" borderWidth={3}>
                    <Heading size="md" color="white">参加者</Heading>
                    <Separator />
                    <Flex direction="column" gap={{sm: 2, base: 4}} mt={4} align="center">
                        {Array(4).fill(0).map((_,i)=>(
                            <JoinerItem key={i} />
                        ))}
                    </Flex>
                </Box>
                <Box rounded="md" bgGradient="linear(to-br, rgba(72, 85, 99, 0.6), rgba(41, 50, 60, 0.8))" p={{sm: 2, base: 4}} borderColor="gray.300" borderWidth={3}>
                    <Heading size="md" color="white">待機者</Heading>
                    <Separator />
                    <ScrollArea overflow="hidden" type="always" maxH="180px" p={2} ref={containerRef}>
                        <SimpleGrid columns={{md: 2, base: 4}} gap={{sm: 2, base: 4}} mt={2} align="center" >
                            {Array(30).fill(0).map((_,i)=>(
                                <GridItem key={i} colSpan={1}>
                                    <JoinerItem />
                                </GridItem>
                            ))}
                        </SimpleGrid>
                    </ScrollArea>
                </Box>
            </Flex>
        </Box>
    )
}