"use client";

import { Suspense } from "react";
import Board from "./board";

export default function BrowserSource() {
    return (
        <Suspense>
            <Board />
        </Suspense>
    )
}