import { Center } from "@yamada-ui/react"

export default function MainBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-white bg-gradient-to-br from-orange-300 to-yellow-600 place-content-center">
            <Center
                p={{sm: 4, md: 8, base: 12}}
                className="min-h-screen"
            >
                {children}
            </Center>
        </div>
    )
}