"use client";
import { Snacks, useSnacks, type AlertStatusValue, Box } from "@yamada-ui/react";
import { createContext, useContext } from "react";

type contextType = {
    openSnack: (title: string, description: string, status: AlertStatusValue) => string | number
}
const AlertSnackContext = createContext<contextType|undefined>(undefined);

export const useAlertSnack = () => {
    const context = useContext(AlertSnackContext);
    if (!context) throw new Error('アラートが出ないエラーが発生しています');
    return context;
};

export default function AlertSnack({ children }: { children: React.ReactNode }) {
    const { snack, snacks } = useSnacks({ 
        variant: 'solid', 
        duration: 5000,
    });

    const openSnack = (title: string, description: string, status: AlertStatusValue) => snack({title, description, status})

    return (
        <AlertSnackContext.Provider value={{openSnack}}>
            <>
                {children}
            </>
            <Box position="fixed" w="full" top={0} p={4}>
                <Snacks snacks={snacks}/>
            </Box>
        </AlertSnackContext.Provider>
    )
}