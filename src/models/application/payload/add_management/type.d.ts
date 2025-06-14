import type { ManageType, ManageDTO } from "@/models/domain/entity";

export type AddManagementRequestType = Omit<ManageType, 'id'>;

export type AddManagementResponseType = {
    management_id: ManageType['id'];
}

export type AddManagementRequestDTO = Omit<ManageDTO, 'id'>;

export type AddManagementResponseDTO = {
    management_id: ManageDTO['id'];
}

