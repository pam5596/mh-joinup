"use client";

import { Flex, Heading, Tag, Tooltip, IconButton, Input } from "@yamada-ui/react";
import { FaQuestion, FaPlus, FaMinus } from "react-icons/fa";

import type { SettingsPayload } from "@/models/application/payload";

type Props = {
    settings: SettingsPayload.GETResponseType;
    changeQuestAction: (value: number) => void
}

export default function QuestSetting(props: Props) {
    return (
        <>
            <Heading as="h2" size="sm">
                交代クエスト数
                <Tooltip label="交代するクエスト数を設定できます。編集画面では交代可能なユーザに緑のツールチップが付与されます。" placement="top">
                    <Tag size="sm" rounded="full" colorScheme="blackAlpha" border="white" bgColor="whiteAlpha.600" ml={2}>
                        <FaQuestion/>
                    </Tag>
                </Tooltip>
            </Heading>
            <Flex ml="auto" gap={3}>
                <IconButton 
                    icon={<FaMinus />} 
                    colorScheme="whiteAlpha"
                    onClick={() =>
                        props.changeQuestAction(
                            props.settings.quest == 0 ? 0 : props.settings.quest - 1
                        )
                    }
                />
                <Input 
                    value={props.settings.quest}
                    readOnly
                />
                <IconButton 
                    icon={<FaPlus />}
                    colorScheme="whiteAlpha"
                    onClick={() =>
                        props.changeQuestAction(
                            props.settings.quest + 1
                        )
                    }
                />
            </Flex>
        </>
    )
}