import { ObjectId } from "mongodb";

import AbsUseCase from "./abstruct";
import { AddManagementRequestPayload, AddManagementResponsePayload } from "../payload";
import { ManagementRepository } from "@/models/infrastructure/repository";
import { ManageEntity } from "@/models/domain/entity";

export default class AddManagementUseCase extends AbsUseCase<AddManagementRequestPayload, AddManagementResponsePayload> {
    managementRepository: ManagementRepository;
    
    constructor(
        request: AddManagementRequestPayload, 
        managementRepository: ManagementRepository
    ) {
        super(request);
        this.managementRepository = managementRepository;
    }

    async execute(): Promise<AddManagementResponsePayload> {
        const request = this.request.toObject();

        const insert_management = new ManageEntity(
            new ObjectId(),
            request.connection_id,
            request.joiner,
            request.waiter,
            request.quests,
            request.applicants
        )

        const inserted_management_id = await this.managementRepository.insert(insert_management) as ObjectId;
        return new AddManagementResponsePayload(
            inserted_management_id
        );
    }
}