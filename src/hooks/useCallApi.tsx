"use client";
import useAlertSnack from "./useAlertSnack";

export default function useCallApi() {
    const { openSnack } = useAlertSnack();

    async function fetchAPI<BodyType, ResponseType>(
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
        body?: BodyType,
        successSnackTitle?: string,
        errorSnackTitle?: string,
        onSuccess?: (response: ResponseType) => void,
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

        const response_data = await fetch_result.json();
        console.log(response_data);

        if (!fetch_result.ok) {
            openSnack(
                errorSnackTitle || response_data.message,
                response_data.message || '',
                "error"
            ) 
            onError?.(fetch_result);
        } else {
            if (successSnackTitle) openSnack(
                successSnackTitle,
                '',
                "success"
            );
            onSuccess?.(response_data);
        }
    };

    return { fetchAPI };
}