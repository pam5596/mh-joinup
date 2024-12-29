import { Flex, Heading, Image, Button } from "@yamada-ui/react";
import { FaYoutube, FaTwitch, FaQuestion } from "react-icons/fa";

import { MainBackgroundProvider } from "@/components/provider";

export default function Home() {
    return (
        <MainBackgroundProvider>
            <Flex direction="column" align="center" maxW="400px" gap={4}>
                <Flex direction="column" align="center">
                    <Image src="/logo.svg" alt="logo" maxW="150px" />
                    <Heading as="h1" size={{sm: "2xl", base: "3xl"}}>MHJoinUp</Heading>
                </Flex>
                <Button colorScheme="whiteAlpha" w="90%" startIcon={<FaYoutube/>} color="red.700">Youtubeではじめる</Button>
                <Button colorScheme="whiteAlpha" w="90%" startIcon={<FaTwitch/>} color="purple.900" disabled>Twitchではじめる</Button>
                <Button colorScheme="blackAlpha" w="90%" startIcon={<FaQuestion/>} color="amber.300">MHJoinUpとは</Button>
            </Flex>
        </MainBackgroundProvider>
    );
}
