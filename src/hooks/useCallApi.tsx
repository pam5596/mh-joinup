"use client";
import useAlertSnack from "./useAlertSnack";

export default function useCallApi() {
    const { openSnack } = useAlertSnack();

    async function fetchAPI<ReqBodyT, ResJsonT>(
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
        body?: ReqBodyT,
        successSnackTitle?: string,
        errorSnackTitle?: string,
        onSuccess?: (response: ResJsonT) => void,
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
            openSnack(
                errorSnackTitle || "Errorが発生しました",
                fetch_result.statusText,
                "error"
            )
            onError?.(fetch_result);
        } else {
            openSnack(
                successSnackTitle || "成功しました",
                fetch_result.statusText,
                "success"
            );
            onSuccess?.(await fetch_result.json());
            return await fetch_result.json() as ResJsonT;
        }
    };

    return { fetchAPI };
}