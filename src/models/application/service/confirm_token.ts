import AbsService from "./abstruct";
import { ServiceError } from "@/models/error";


export default class ConfirmTokenService extends AbsService<string, void> {
    async execute(request: string): Promise<void> {
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${request}`
        );

        if (!response.ok) throw new ServiceError(
            "ユーザのGoogle認証トークンの有効期限が切れました。再度ログインしてください。",
            response,
            response.status,
        );
    }
}