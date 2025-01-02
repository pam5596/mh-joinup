import { Box, Avatar, Flex, Text } from "@yamada-ui/react"

export default function Log() {
    return (
        <Box w="full" p={1}>
            <Flex gap={2} align="center">
                <Avatar size="sm" name="Yamada" />
                <Box>
                    <Text fontWeight="bold" isTruncated>Yamada</Text>
                    <Text fontSize="xs" isTruncated>さんがクエストを開始しました</Text>
                </Box>
            </Flex>
        </Box>
    )
}