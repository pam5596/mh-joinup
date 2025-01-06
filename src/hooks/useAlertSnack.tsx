"use client";
import { useContext } from "react";
import { AlertSnackContext } from "@/components/provider";

export default function useAlertSnack() {
    const context = useContext(AlertSnackContext);
    
    if (!context) throw new Error('アラートが出ないエラーが発生しています');
    return context;
};