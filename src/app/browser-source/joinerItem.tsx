"use client";

import { Avatar, Flex, Indicator, Heading, Box, Tag } from "@yamada-ui/react";


type Props = {
    is_liver?: boolean;
    status: 'joiner' | 'waiter';
    joiner_info: {
        name: string;
        avatar: string;
        quest: number;
    };
}

export default function JoinerItem(props: Props) {
    return (
        <Box w="full">
            <Flex align="center" gap={{md:4, base:2}}>
                <Indicator 
                    colorScheme={props.is_liver ? "red" : (props.status == 'joiner' ? "success" : "info")}
                    offset={1} 
                    ping 
                    pingScale={1.4} 
                    size={{md: "md", base: "lg"}}
                >
                    <Avatar src={props.joiner_info.avatar} name={props.joiner_info.name} size={{md: "sm", base: "md"}} />
                </Indicator>
                <Heading as="h5" size={{md: "sm", base: 'md'}} isTruncated fontFamily='ReggaeOne, sans-serif'>
                    {props.joiner_info.name}
                </Heading>
                <Tag
                    variant="solid"
                    colorScheme={props.is_liver ? "red" : (props.status == 'joiner' ? "success" : "info")}
                    marginLeft={"auto"}
                    size="lg"
                >
                    {props.is_liver ? "Liver" : (
                        props.status == 'joiner' ? `${props.joiner_info.quest} クエ` : `あと ${props.joiner_info.quest} クエ`
                    )}
                </Tag>
            </Flex>
        </Box>
    )
}