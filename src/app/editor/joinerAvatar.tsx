"use client";

import { useState } from "react";
import { 
    Avatar, Indicator, Tooltip, 
    Popover, PopoverContent, PopoverTrigger, PopoverHeader, PopoverBody,
    Text, Flex, Input, IconButton,
    Select, Option, Button
} from "@yamada-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { ManageInstantType } from "@/models/domain/embedded/managements/instant/type";

type Props = {
    is_liver: boolean;
    status: 'joiner' | 'waiter';
    joiner_info: ManageInstantType;
    setting_quest: number;
    applicant_id?: string;
    onLeaveEvent?: () => void;
    replaceableUsers?: ManageInstantType[];
    onReplaceEvent?: (replace_to: string) => void
    onUpdateQuestEvent?: (quest: number) => void
}

export default function JoinerAvatar(props: Props) {
    const [replace_to_id, setChangeUserId] = useState<string>()

    return (
        <Popover trigger="click" closeOnButton={false}>
            <PopoverTrigger>
                <Indicator 
                    label={props.joiner_info.quest} 
                    offset={1} 
                    ping 
                    pingScale={1.5} 
                    colorScheme={props.status == 'joiner' ? (
                        props.joiner_info.quest >= props.setting_quest ? 'success' : 'info'
                    ) : (
                        props.joiner_info.quest == 0 ? 'success' : 'info'
                    )}
                    hidden={props.is_liver}
                >
                    <Tooltip label={props.joiner_info.name} p={1} isTruncated>
                        <Avatar name={props.joiner_info.name} src={props.joiner_info.avatar} size={{sm: "sm", base: "md"}} />
                    </Tooltip>
                </Indicator>
            </PopoverTrigger>
            <PopoverContent bgGradient="linear(to-br, rgba(103, 103, 103, 1), rgba(44, 44, 44, 1))" w="300px" p={2} rounded="md" borderColor="white" borderWidth={2}>
                <PopoverHeader isTruncated borderColor="white">
                    <Text maxW="250px" isTruncated>
                        {props.joiner_info.name}
                    </Text>
                </PopoverHeader>
                <PopoverBody>
                    <Flex w="full" flexDirection="column" gap={4}>
                        <Flex w="full" align="center">
                            <Text>クエスト数：</Text>
                            <Flex ml="auto" gap={1}>
                                <IconButton 
                                    icon={<FaMinus />} 
                                    onClick={() => {
                                        if (props.onUpdateQuestEvent) {
                                            props.onUpdateQuestEvent(
                                                props.joiner_info.quest == 0 ? 0 : props.joiner_info.quest - 1
                                            );
                                        }
                                    }}
                                />
                                <Input 
                                    value={props.joiner_info?.quest}
                                    w="50px"
                                    readOnly
                                />
                                <IconButton 
                                    icon={<FaPlus />}
                                    onClick={() => {
                                        if (props.onUpdateQuestEvent) {
                                            props.onUpdateQuestEvent(props.joiner_info.quest + 1);
                                        }
                                    }}
                                />
                            </Flex>
                        </Flex>

                        <Flex w="full" align="center" gap={2}>
                            <Select 
                                placeholder="待機者を選択" 
                                placeholderInOptions={false} 
                                textColor="white" 
                                iconProps={{color: "white"}} 
                                listProps={{bg: "#2c2c2c", rounded: "md", _scrollbar: { display: "none" }}}
                                onChange={setChangeUserId}
                                disabled={props.replaceableUsers?.length || props.status == 'joiner' ? false : true}
                            >
                                {props.replaceableUsers ? props.replaceableUsers.map((user, i) => (
                                    <Option key={i} value={user.applicant_id}>
                                        <Flex align="center" gap={2}>
                                            <Avatar size="xs" src={user.avatar} name={user.name} />
                                            <Text maxW="150px" isTruncated>{user.name}</Text>
                                        </Flex>
                                    </Option>
                                )) : null}
                            </Select>
                            <Text>と</Text>
                            <Button 
                                colorScheme="teal" 
                                disabled={!Boolean(replace_to_id)}
                                onClick={() => replace_to_id && props.onReplaceEvent ? props.onReplaceEvent(replace_to_id) : undefined}
                            >
                                交代
                            </Button>
                        </Flex>

                        <Button colorScheme="danger" w="full" onClick={props.onLeaveEvent}>退席</Button>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}