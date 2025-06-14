import { Box, Center } from "@yamada-ui/react"

export default function LiveBackground({ children }: { children: React.ReactNode }) {
    return (
        <Box color="white" bgGradient="linear-gradient(135deg, #93a5cf 0%, #e4efe9 100%);">
            <Center
                p={{sm: 4, md: 8, base: 12}}
                className="min-h-screen"
            >
                {children}
            </Center>
        </Box>
    )
}