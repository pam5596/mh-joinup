"use client";
import { Snacks, useSnacks, type AlertStatusValue, Box } from "@yamada-ui/react";
import { createContext } from "react";

type contextType = {
    openSnack: (title: string, description: string, status: AlertStatusValue) => string | number
}
export const AlertSnackContext = createContext<contextType|undefined>(undefined);

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