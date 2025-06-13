export default abstract class AbsUseCase<ReqT, ResT> {
    request: ReqT;
    
    constructor(request: ReqT) {
        this.request = request;
    }

    abstract execute(): Promise<ResT>;
}