"use client";
import { Dialog, DialogBody, Alert, AlertIcon, AlertTitle, AlertDescription, Flex } from "@yamada-ui/react";

export default function Snackbar () {  
    return (
        <Dialog open={true} withOverlay={false} placement="bottom-left">
            <DialogBody m={0} p={0}>
                <Alert status="info" variant="solid">
                    <AlertIcon />
                    <Flex direction="column" gap={1}>
                        <AlertTitle>アラート</AlertTitle>
                        <AlertDescription>
                            スナックバー
                        </AlertDescription>
                    </Flex>
                </Alert>
            </DialogBody>
        </Dialog>
    )
}