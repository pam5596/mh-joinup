"use client";

import { Flex, Heading, Image, Button, useDisclosure } from "@yamada-ui/react";
import { FaYoutube, FaLink } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import { MainBackgroundProvider } from "@/components/provider";
import SettingModal from "./settingModal";

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <MainBackgroundProvider>
            <Flex direction="column" align="center" maxW="400px" gap={4}>
                <Flex direction="column" align="center" gap={4}>
                    <Image src={"null"} alt="usericon" maxW="150px" shadow="3px 3px 15px #373737" rounded="100%"/>
                    <Heading as="h1" size={{sm: "md", base: "md"}} isTruncated w="180px">{null}</Heading>
                </Flex>
                <Button colorScheme="whiteAlpha" w="90%" startIcon={<FaYoutube/>} color="red.700">配信に接続</Button>
                <Button colorScheme="whiteAlpha" w="90%" startIcon={<FaLink/>} color="amber.700">ブラウザソースをコピー</Button>
                <Button colorScheme="blackAlpha" w="90%" startIcon={<IoSettingsSharp/>} color="amber.300" onClick={onOpen}>ユーザ設定</Button>
            </Flex>
            <SettingModal isOpen={isOpen} onClose={onClose}/>
        </MainBackgroundProvider>
    )
}