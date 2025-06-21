import type { UserType, UserDTO } from "@/models/domain/entity";

export type GetUserRequestType = {
    user_id: UserType['id'];
}

export type GetUserRequestDTO = {
    user_id: UserDTO['id'];
}

export type GetUserResponseType = Omit<UserType, 'id'>

export type GetUserResponseDTO = Omit<UserDTO, 'id'>;