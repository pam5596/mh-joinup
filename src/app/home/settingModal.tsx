"use client";

import { Modal, ModalHeader, ModalBody, Separator } from "@yamada-ui/react";

import KeyWordSetting from "./keywordSetting";

type Props = {
    isOpenAction: boolean;
    onCloseAction: () => void;
}

export default function SettingModal({ isOpenAction, onCloseAction }: Props) {
    return (
        <Modal open={isOpenAction} onClose={onCloseAction} size="sm" scrollBehavior="inside" bgColor="blackAlpha.700" color="white">
            <ModalHeader p="16px">ユーザ設定</ModalHeader>
            <Separator variant="solid"/>
            <ModalBody p="16px" m="0">
                <KeyWordSetting/>
            </ModalBody>
        </Modal>
    )
}