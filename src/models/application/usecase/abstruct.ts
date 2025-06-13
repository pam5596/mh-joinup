export default abstract class AbsUseCase<ReqPayload, Respayload> {
    request: ReqPayload;
    
    constructor(request: ReqPayload) {
        this.request = request;
    }

    abstract execute(): Promise<Respayload>;
}