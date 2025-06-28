import type { UserType } from "@/models/domain/entity";

export type GETRequestType = Request;

export type GETResponseType = Omit<UserType, 'id'>