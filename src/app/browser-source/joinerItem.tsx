"use client";

import { Avatar, Flex, Indicator, Heading, Box } from "@yamada-ui/react";

export default function JoinerItem() {
    return (
        <Box w="full">
            <Flex justify="center" align="center" gap={{md:4, base:2}}>
                <Indicator label="2" offset={1} ping pingScale={1.4} size="lg">
                    <Avatar name="PAM" size={{md: "sm", base: "md"}} />
                </Indicator>
                <Heading as="h5" size={{md: "sm", base: 'md'}} isTruncated>
                    PAM
                </Heading>
            </Flex>
        </Box>
    )
}