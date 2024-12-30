"use client";

import { Modal, ModalHeader, ModalBody, Separator } from "@yamada-ui/react";

import KeyWordSetting from "./keywordSetting";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export default function HomeModal({ isOpen, onClose }: Props) {
    return (
        <Modal open={isOpen} onClose={onClose} size="sm" scrollBehavior="inside" bgColor="blackAlpha.700" color="white">
            <ModalHeader p="16px">ユーザ設定</ModalHeader>
            <Separator variant="solid"/>
            <ModalBody p="16px" m="0">
                <KeyWordSetting/>
            </ModalBody>
        </Modal>
    )
}