import type { UserType } from "@/models/domain/entity";
import { TokenResponse } from "@react-oauth/google";

export type POSTRequestType = TokenResponse;

export type POSTResponseType = {
    user_id: UserType['id'];
    auth_token: string;
}