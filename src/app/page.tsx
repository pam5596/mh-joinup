"use client";

import { Flex, Heading, Image, Button } from "@yamada-ui/react";
import { FaYoutube, FaTwitch, FaQuestion } from "react-icons/fa";

import { MainBackgroundProvider } from "@/components/provider";

export default function Index() {
    return (
        <MainBackgroundProvider>
            <Flex direction="column" align="center" maxW="400px" gap={4}>
                <Flex direction="column" align="center">
                    <Image src="/logo.svg" alt="logo" maxW="200px" />
                    <Heading as="h1" size={{sm: "2xl", base: "3xl"}} fontFamily='ReggaeOne, sans-serif'>MHJoinUp</Heading>
                </Flex>
                <Button colorScheme="red" w="90%" startIcon={<FaYoutube/>}>
                    Youtubeではじめる
                </Button>
                <Button colorScheme="violet" w="90%" startIcon={<FaTwitch/>} disabled>Twitchではじめる</Button>
                <Button colorScheme="blackAlpha" w="90%" startIcon={<FaQuestion/>}>MHJoinUpとは</Button>
            </Flex>
        </MainBackgroundProvider>
    );
}
