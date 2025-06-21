"use client";
import useAlertSnack from "./useAlertSnack";

export default function useCallApi() {
    const { openSnack } = useAlertSnack();

    async function fetchAPI<BodyType>(
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
        body?: BodyType,
        successSnack?: { title: string, description?: string },
        errorSnack?: { title: string, description?: string },
        onSuccess?: (response: Response) => void,
        onError?: (error: Response) => void
    ) {
        const fetch_result = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!fetch_result.ok) {
            if (errorSnack) openSnack(
                errorSnack.title,
                errorSnack.description || `${fetch_result.status} ${fetch_result.statusText}`,
                "error"
            ) 
            onError?.(fetch_result);
        } else {
            if (successSnack) openSnack(
                successSnack.title,
                successSnack.description || '',
                "success"
            );
            onSuccess?.(fetch_result);
        }

        return await fetch_result.json()
    };

    return { fetchAPI };
}