import { Box, Avatar, Flex, Text } from "@yamada-ui/react"

type Props = {
    name: string;
    avatar: string;
    message: string;
}

export default function LogItem(props: Props) {
    return (
        <Box w="full" p={1}>
            <Flex gap={2} align="center">
                <Avatar size="sm" src={props.avatar} name={props.name} />
                <Box>
                    <Text fontWeight="bold" isTruncated>{props.name}</Text>
                    <Text fontSize="xs" isTruncated>{props.message}</Text>
                </Box>
            </Flex>
        </Box>
    )
}