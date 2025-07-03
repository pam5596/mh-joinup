"use client";

import { Flex, Heading, Image, Button, useDisclosure, SkeletonCircle, SkeletonText } from "@yamada-ui/react";
import { FaListUl, FaLink, FaCalendarCheck } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import { MainBackgroundProvider, GoogleOauthProvider } from "@/components/provider";
import SettingModal from "./settingModal";

import { useHomeController } from "../controller";

export default function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { userInfo, getBrowserSourceEvent } = useHomeController();

    return (
        <GoogleOauthProvider>
            <MainBackgroundProvider>
                <Flex direction="column" align="center" maxW="400px" gap={4}>
                    <Flex direction="column" align="center" gap={4}>
                        <SkeletonCircle loaded={Boolean(userInfo.avatar)} w="150px" h="150px" rounded="100%">
                            <Image src={userInfo.avatar} alt="usericon" w="150px" h="150px" shadow="3px 3px 15px #373737" rounded="100%"/>
                        </SkeletonCircle>
                        <SkeletonText loaded={Boolean(userInfo.name)} w="180px" fontSize="lg" textAlign="center" lineClamp={1} textHeight="30px">
                            <Heading as="h1" size={{sm: "md", base: "md"}} isTruncated maxW="180px" fontFamily='ReggaeOne, sans-serif'>
                                {userInfo.name}
                            </Heading>
                        </SkeletonText>
                    </Flex>
                    <Button 
                        colorScheme="red"
                        w="full" 
                        startIcon={<FaListUl/>} 
                        onClick={()=>{location.href = '/editor'}}
                    >
                        参加管理画面へ
                    </Button>
                    <Button 
                        colorScheme="emerald" 
                        w="full" 
                        startIcon={<FaLink/>} 
                        onClick={getBrowserSourceEvent}
                    >
                        ブラウザソースをコピー
                    </Button>
                    <Button 
                        colorScheme="indigo" 
                        w="full" 
                        startIcon={<FaCalendarCheck/>} 
                        onClick={()=>{location.href = '/schedule'}}
                    >
                        今週の配信スケジュール
                    </Button>
                    <Button 
                        colorScheme="blackAlpha" 
                        w="full" 
                        startIcon={<IoSettingsSharp/>} 
                        color="whiteAlpha" 
                        onClick={onOpen}
                    >
                        ユーザ設定
                    </Button>
                </Flex>
                <SettingModal isOpenAction={isOpen} onCloseAction={onClose}/>
            </MainBackgroundProvider>
        </GoogleOauthProvider>
        
    )
}