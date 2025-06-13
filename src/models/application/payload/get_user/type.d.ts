import type { UserType, UserDTO } from "@/models/domain/entity";

export type GetUserResponseType = Omit<UserType, 'id'>

export type GetUserResponseDTO = Omit<UserDTO, 'id'>;