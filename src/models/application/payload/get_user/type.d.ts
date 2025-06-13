import type { UserType, UserDTO } from "@/models/domain/entity";

export type GetUserRequestType = Pick<UserType, 'channel_id'>;

export type GetUserRequestDTO = Pick<UserDTO, 'channel_id'>;

export type GetUserResponseType = Omit<UserType, 'id'>

export type GetUserResponseDTO = Omit<UserDTO, 'id'>;