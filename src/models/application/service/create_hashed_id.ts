import { ObjectId } from "mongodb";
import { createHash } from "crypto";

import AbsService from "./abstruct";
import { ServiceError } from "@/models/error";


export default class CreateHashedIdService extends AbsService<ObjectId, string|void> {
    async execute(request: ObjectId): Promise<string|void> {
        try {
            return createHash('sha256').update(request.toHexString()).digest('hex');
        } catch (error: unknown) {
            if (error instanceof Error) throw new ServiceError(
                error.message,
                request,
                400
            )
        }
    }
}