"use client";

import { Modal, ModalHeader, ModalBody, Separator } from "@yamada-ui/react";

import KeyWordSetting from "./keywordSetting";
import QuestSetting from "./questSetting";
import { useSettingController } from "../controller";

type Props = {
    isOpenAction: boolean;
    onCloseAction: () => void;
}

export default function SettingModal({ isOpenAction, onCloseAction }: Props) {
    const { 
        settings, 
        addNewKeywordEvent, 
        removeKeywordEvent, 
        updateKeyWordEvent,
        updateQuestEvent
    } = useSettingController();
    

    return (
        <Modal open={isOpenAction} onClose={onCloseAction} size="sm" scrollBehavior="inside" bgColor="blackAlpha.700" color="white">
            <ModalHeader p="16px">ユーザ設定</ModalHeader>
            <Separator variant="solid"/>
            <ModalBody p="16px" m="0">
                { settings ? (
                <>
                    <KeyWordSetting
                        settings={settings}
                        addKeywordAction={addNewKeywordEvent}
                        removeKeywordAction={removeKeywordEvent}
                        updateKeywordAction={updateKeyWordEvent}
                    />
                    <QuestSetting
                        settings={settings}
                        changeQuestAction={(value) => updateQuestEvent(value)}
                    />
                </>
                ) : null}
            </ModalBody>
        </Modal>
    )
}