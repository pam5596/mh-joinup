import type { ConnectionType, ConnectionDTO } from "@/models/domain/entity";

export type GetConnectionResponseType = {
    connection_id: ConnectionType['id'];
} & Omit<ConnectionType,'id'|'user_id'>;

export type GetConnectionResponseDTO = {
    connection_id: ConnectionDTO['id'];
} & Omit<ConnectionDTO,'id'|'user_id'>;