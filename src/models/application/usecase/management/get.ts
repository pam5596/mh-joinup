import AbsUseCase from "../abstruct";
import { UseCaseError } from "@/models/error";

import { ManagementPayload } from "@/models/application//payload";
import { ManagementRepository } from "@/models/infrastructure/repository";
import { ObjectId } from "mongodb";


export default class ManagementGETUseCase extends AbsUseCase<ManagementPayload.GETRequestType, ManagementPayload.GETResponseType> {
    managementRepository: ManagementRepository;

    constructor(
        request: ManagementPayload.GETRequestType,
        managementRepository: ManagementRepository
    ) {
        super(request)
        this.managementRepository = managementRepository
    }

    async execute(): Promise<ManagementPayload.GETResponseType> {
        const { searchParams } = new URL(this.request.url);
        const connection_id = searchParams.get('connection_id');

        if (!connection_id) throw new UseCaseError(
            'クエリパラメータにconnection_idが割り当てられていません',
            searchParams,
            400
        )

        const selected_managements = await this.managementRepository.selectAllByConnectionId(new ObjectId(connection_id));

        if (selected_managements) {
            return {
                managements: selected_managements.map((management) => {
                    const { id, ...ignore_id_json } = management.toJson();
                    return {
                        management_id: id,
                        ...ignore_id_json
                    }
                })
            }
        } else {
            return {
                managements: []
            }
        }
    }

}