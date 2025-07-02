"use client";
import { Flex, Card, Heading, Text } from "@yamada-ui/react";

export default function WeeklyEvent() {
    return (
        <Flex flexDirection="row" gap={4} justifyContent="space-between">
            <Card flexDirection="row" gap={1} alignItems="end" borderRadius={50} variant="solid" bgImage="linear-gradient(135deg, #fcd060 0%, #ff8e2b 100%);" p={2}>
                <Heading textAlign="center" size="md" color="white" fontFamily='ReggaeOne, sans-serif'>
                    月
                </Heading>
                <Text size="sm" fontFamily='ReggaeOne, sans-serif'>
                    Mon
                </Text>
            </Card>
            <Card justifyContent="center" variant="solid" colorScheme="whiteAlpha" w="70%" p={2}>
                a
            </Card>
            <Card justifyContent="center"  variant="solid" colorScheme="whiteAlpha" w="20%" p={2}>
                a
            </Card>
        </Flex>
    )
}