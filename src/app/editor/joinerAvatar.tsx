"use client";

import { 
    Avatar, Indicator, Tooltip, 
    Popover, PopoverContent, PopoverTrigger, PopoverHeader, PopoverBody, 
    Text, Flex, useNumberInput, Input, IconButton,
    Select, Option, Button
} from "@yamada-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";

type Props = {
    is_liver: boolean;
    name: string;
    avatar: string;
    channel_id: string;
    quests: number;
}

export default function JoinerAvatar(props: Props) {
    const { getInputProps, getIncrementProps, getDecrementProps } = useNumberInput({
        defaultValue: props.quests,
        min: 0
    });

    return (
        <Popover trigger="click">
            <PopoverTrigger>
                <Indicator label="2" offset={1} ping pingScale={1.4} hidden={props.is_liver}>
                    <Tooltip label={props.name} p={1} isTruncated>
                        <Avatar name={props.name} src={props.avatar} size={{sm: "sm", base: "md"}} />
                    </Tooltip>
                </Indicator>
            </PopoverTrigger>
            <PopoverContent bgGradient="linear(to-br, rgba(103, 103, 103, 1), rgba(44, 44, 44, 1))" w="300px" p={2} rounded="md" borderColor="white" borderWidth={2}>
                <PopoverHeader isTruncated borderColor="white">
                    <Text maxW="250px" isTruncated>
                        {props.name}
                    </Text>
                </PopoverHeader>
                <PopoverBody>
                    <Flex w="full" flexDirection="column" gap={4}>
                        <Flex w="full" align="center">
                            <Text>クエスト数：</Text>
                            <Flex ml="auto" gap={1}>
                                <IconButton icon={<FaMinus />} {...getDecrementProps()} />
                                <Input {...getInputProps()} w="50px" />
                                <IconButton icon={<FaPlus />} {...getIncrementProps()} />
                            </Flex>
                        </Flex>

                        <Flex w="full" align="center" gap={2}>
                            <Select placeholder="待機者を選択" placeholderInOptions={false} textColor="white" iconProps={{color: "white"}} listProps={{bg: "#2c2c2c", rounded: "md", _scrollbar: { display: "none" }}}>
                                {Array(10).fill(0).map((_, i) => (
                                    <Option key={i}>
                                        <Flex align="center" gap={2}>
                                            <Avatar size="xs" name={`待機者${i}`} />
                                            <Text maxW="150px" isTruncated>待機者</Text>
                                        </Flex>
                                    </Option>
                                ))}
                            </Select>
                            <Text>と</Text>
                            <Button colorScheme="teal">交代</Button>
                        </Flex>

                        <Button colorScheme="danger" w="full">退席</Button>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}