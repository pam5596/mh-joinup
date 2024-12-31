import { Avatar, Indicator } from "@yamada-ui/react";

export default function EditorAvatar() {
    return (
        <Indicator label="2" offset={1} ping pingScale={1.4}>
            <Avatar name="Saiki Ryosuke" size={{sm: "sm", base: "md"}} />
        </Indicator>
    )
}